export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Subject {
  id: string;
  name: string;
  description: string;
  folder: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  file: string;
}

export interface Question {
  id: string;
  title: string;
  difficulty?: Difficulty;
  explanationMarkdown: string;
  interviewAnswerMarkdown: string;
}