'use client';

import { Candidate } from '@/types/candidate';
import useSWR from 'swr';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export function CandidateList() {
  const { data: candidates, error, isLoading } = useSWR<Candidate[]>(
    '/api/candidates',
    url => fetch(url).then(res => res.json())
  );

  if (error) return <div>Failed to load candidates</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <DataTable
      columns={columns}
      data={candidates || []}
    />
  );
} 