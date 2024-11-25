// src/services/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Question, QuestionForm, Answer, AnswerForm } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 백엔드 서버 URL
});

// API 호출 함수들
const getQuestions = (): Promise<AxiosResponse<Question[]>> => {
  return api.get<Question[]>('/questions/');
};

const createQuestion = (data: QuestionForm): Promise<AxiosResponse<Question>> => {
  return api.post<Question>('/questions/create', data);
};

const deleteQuestion = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/questions/${id}`);
};

const getQuestion = (id: number): Promise<AxiosResponse<Question>> => {
  return api.get<Question>(`/questions/${id}`);
};

const createAnswer = (data: AnswerForm): Promise<AxiosResponse<Answer>> => {
  return api.post<Answer>('/answers/create', data);
};

const deleteAnswer = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/answers/${id}`);
};

export {
  getQuestions,
  createQuestion,
  deleteQuestion,
  getQuestion,
  createAnswer,
  deleteAnswer,
};
