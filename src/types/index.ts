// src/types/index.ts

export interface QuestionForm {
  subject: string;
  content: string;
}

export interface AnswerForm {
  content: string;
  questionId: number;
}

export interface Answer {
  id: number;
  content: string;
  createDate: string;
}

export interface Question {
  id: number;
  subject: string;
  content: string;
  createDate: string;
  answerList: Answer[];
}
