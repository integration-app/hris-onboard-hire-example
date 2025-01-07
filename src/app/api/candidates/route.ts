import { NextResponse } from 'next/server';
import { dummyCandidates } from '@/utils/dummy-candidates';

export async function GET() {
  return NextResponse.json(dummyCandidates);
} 