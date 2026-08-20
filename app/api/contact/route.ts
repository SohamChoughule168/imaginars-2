import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    const rawText = await request.text();
    console.log('Raw body:', rawText);
    console.log('Body length:', rawText.length);
    
    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON', details: parseError instanceof Error ? parseError.message : 'Parse failed' },
        { status: 400 }
      );
    }
    
    console.log('Parsed body:', body);
    const validatedData = contactSchema.parse(body);

    console.log('Contact form submission:', validatedData);
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}