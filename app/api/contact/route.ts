import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  return new Response(JSON.stringify({ success: true, message: 'OK' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}