// src/app/api/testimonials/[code]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Input validation
    if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
      return NextResponse.json(
        { error: 'Invalid limit or offset parameters' },
        { status: 400 }
      );
    }

    const testimonials = await prisma.feedback.findMany({
      where: {
        code: params.code,
      },
      select: {
        id: true,
        name: true,
        feedback: true,
        rating: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({
      testimonials,
      count: testimonials.length,
      nextOffset: offset + limit,
    });

  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// Add CORS headers
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}