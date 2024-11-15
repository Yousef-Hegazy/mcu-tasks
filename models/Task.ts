export interface Task {
  id: string;
  createdAt: string;
  title: string;
  description?: string;
  isFinished: boolean;
  issuer: string;
  finishedAt?: string;
}
