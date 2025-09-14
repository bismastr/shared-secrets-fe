import { AxiosError } from 'axios';
import apiClient from '../apiClient';

// Types
export interface Card {
    id: string;
    question: string;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

// Generic API response type
export interface ApiResponse<T> {
    data: T;
    meta?: {
        total?: number;
        page?: number;
        pageSize?: number;
    };
}

// Specific error types for better error handling
export interface ApiError {
    message: string;
    statusCode?: number;
    error?: unknown;
    code?: string;
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


