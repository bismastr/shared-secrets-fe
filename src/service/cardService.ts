import { AxiosError } from 'axios';
import apiClient from '../apiClient';

export interface Card {
    id: string;
    question: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    data: T;
    meta?: {
        total?: number;
        page?: number;
        pageSize?: number;
    };
}


export interface ApiError {
    message: string;
    statusCode?: number;
    error?: unknown;
    code?: string;
}

export interface VoteCount {
    emoticon: string;
    count: number;
}

export interface Answer {
    id: string;
    cardId: string;
    answerText: string;
    createdAt: string;
    updatedAt: string;
    voteCounts: VoteCount[];
}

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.error('Authentication required');
        }

        if (!error.response) {
            console.error('Network error: Please check your connection');
        }

        return Promise.reject(error);
    }
);

export const getFeaturedCards = async (): Promise<Card[]> => {
    try {
        const response = await apiClient.get<Card[] | ApiResponse<Card[]>>('/cards/featured');
        return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const apiError: ApiError = {
            message: 'Failed to fetch featured cards',
            statusCode: axiosError.response?.status,
            error: axiosError.response?.data || axiosError.message,
            code: axiosError.code
        };
        console.error('Featured cards fetch error:', apiError);
        throw apiError;
    }
}

export const getAnswerByCardId = async (cardId: string): Promise<Answer[]> => {
    try {
        const response = await apiClient.get<Answer[] | ApiResponse<Answer[]>>(`/answers/${cardId}`);
        return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const apiError: ApiError = {
            message: `Failed to fetch answers for card ID: ${cardId}`,
            statusCode: axiosError.response?.status,
            error: axiosError.response?.data || axiosError.message,
            code: axiosError.code
        };
        console.error(`Answer fetch error for card ID ${cardId}:`, apiError);
        throw apiError;
    }
}


