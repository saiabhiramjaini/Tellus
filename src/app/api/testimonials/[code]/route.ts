// app/api/testimonials/[code]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { z } from 'zod';

const QuerySchema = z.object({
  limit: z.string().optional().transform(val => parseInt(val || '5')),
  offset: z.string().optional().transform(val => parseInt(val || '0')),
});

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const query = QuerySchema.parse(Object.fromEntries(searchParams));
    
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
      take: query.limit,
      skip: query.offset,
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}