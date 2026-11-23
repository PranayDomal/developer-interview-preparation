export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  questionFile: string;
  questionCount?: number;
}