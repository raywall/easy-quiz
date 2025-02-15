export interface Question {
    question: string;
    options: string[];
    correct: number[];
    explanation: string;
    type: 'single' | 'multiple';
  }