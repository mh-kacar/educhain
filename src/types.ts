export interface Student {
  id: string;
  name: string;
  grade: string;
  email?: string;
}

export interface Project {
  id: string;
  name: string;
  type: 'Project' | 'Competition' | 'Seminar';
  description: string;
  date: string;
}

export interface ParticipationRecord {
  studentId: string;
  studentName?: string;
  projectId: string;
  projectName?: string;
  role: string;
  achievement: string;
  timestamp: string;
}

export interface Block {
  index: number;
  timestamp: number;
  data: ParticipationRecord[];
  previousHash: string;
  hash: string;
  nonce: number;
}
