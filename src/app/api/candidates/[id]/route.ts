import { NextResponse } from 'next/server';
import { getCandidateById } from '@/utils/dummy-candidates';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const candidate = await getCandidateById(params.id);
  
  if (!candidate) {
    return NextResponse.json(
      { error: 'Candidate not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(candidate);
} 