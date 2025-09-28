import type { AxiosInstance } from "axios";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export default apiClient;