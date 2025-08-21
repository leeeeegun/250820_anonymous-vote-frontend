import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

// 질문 조회
export const getQuestions = async () => {
    const res = await api.get('/questions');
    return res.data;
};

// 질문 단일 조회
export const getQuestion = async (questionId: number) => {
    const res = await api.get(`/questions/${questionId}`);
    return res.data;
};

import type { QuestionCreateDTO } from "../types";

// 질문 생성
export const createQuestion = async (questionData: QuestionCreateDTO) => {
    const res = await api.post('/questions', questionData);
    return res.data;
};

// 옵션 추가
export const addOption = async (questionId: number, content: string) => {
    const res = await api.post(`/questions/${questionId}/options`, { content });
    return res.data;
};

// 투표하기
export const voteOption = (questionId: number, optionId: number) => {
    return api.post(`/questions/${questionId}/vote/${optionId}`);
};

export const deleteQuestion = (id: number) => {
    return api.delete(`/questions/${id}`);
};

// 결과 조회
export const getResults = async (questionId: number) => {
    const res = await api.get(`/questions/${questionId}/results`);
    return res.data;
};