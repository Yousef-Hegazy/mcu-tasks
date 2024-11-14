export interface Task {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  isFinished: boolean;
  issuer: string;
  finishedAt?: string;
}
