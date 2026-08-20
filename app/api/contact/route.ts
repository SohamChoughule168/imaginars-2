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
    console.log('API: Content-Type:', contentType);
    console.log('API: Method:', request.method);
    console.log('API: URL:', request.url);
    
    // Check if body is already read
    const bodyUsed = (request as any).bodyUsed;
    console.log('API: bodyUsed before json():', bodyUsed);
    
    let body: any;
    try {
      body = await request.json();
      console.log('API: request.json() succeeded');
    } catch (jsonError) {
      console.error('API: request.json() error:', jsonError);
      return NextResponse.json(
        { success: false, message: 'Invalid JSON', details: jsonError instanceof Error ? jsonError.message : 'Parse failed' },
        { status: 400 }
      );
    }
    
    console.log('API: Parsed body:', body);
    const validatedData = contactSchema.parse(body);

    console.log('API: Contact form submission:', validatedData);
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API: Contact form error:', error);
    
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