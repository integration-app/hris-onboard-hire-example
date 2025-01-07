import { CandidateList } from '@/components/candidates/candidate-list';

export default function CandidatesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Candidates</h1>
      <CandidateList />
    </div>
  );
} 