'use client';

import { Candidate } from '@/types/candidate';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { OnboardingModal } from './onboarding-modal';

export const columns = [
  {
    header: 'Name',
    accessorKey: 'name' as keyof Candidate,
    cell: (value: string) => value || '-',
  },
  {
    header: 'Email',
    accessorKey: 'email' as keyof Candidate,
    cell: (value: string) => value || '-',
  },
  {
    header: 'Role',
    accessorKey: 'role' as keyof Candidate,
    cell: (value: string) => value || '-',
  },
  {
    header: 'Status',
    accessorKey: 'status' as keyof Candidate,
    cell: (value: string) => (
      <Badge variant={value === 'active' ? 'default' : 'secondary'}>
        {value || 'unknown'}
      </Badge>
    ),
  },
  {
    header: 'Experience',
    accessorKey: 'experience' as keyof Candidate,
    cell: (value: number) => (value ? `${value} years` : '-'),
  },
  {
    header: 'Location',
    accessorKey: 'location' as keyof Candidate,
    cell: (value: string) => value || '-',
  },
  {
    header: 'Created',
    accessorKey: 'createdAt' as keyof Candidate,
    cell: (value: Date) => (value ? format(new Date(value), 'PP') : '-'),
  },
  {
    header: 'Actions',
    accessorKey: 'id' as keyof Candidate,
    cell: (value: string, row: any) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const status = row?.status;

      if (!status || status !== 'active') {
        return null;
      }

      return (
        <>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            Hire
          </Button>
          <OnboardingModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            candidate={row}
          />
        </>
      );
    },
  },
]; 