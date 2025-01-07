export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  experience: number;
  skills: string[];
  location: string;
  createdAt: Date;
  updatedAt: Date;
} 