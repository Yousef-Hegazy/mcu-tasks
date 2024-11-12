export interface Task {
  id: number;
  createdAt: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  isFinished: boolean;
  issuerEn: string;
  issuerAr: string;
  finishedAt?: string;
}
