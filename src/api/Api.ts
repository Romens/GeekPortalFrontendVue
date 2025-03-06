import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Api {
    private static instance: Api;
    private axiosInstance: AxiosInstance;
    private readonly baseURL = 'https://api.geekportal.org';
    private readonly tokenKey = 'geekportal_auth';

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            withCredentials: true,
        });

        // Восстанавливаем токен при создании экземпляра
        const token = this.getToken();
        if (token) {
            this.setAuthHeader(token);
        }
    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }

    private setAuthHeader(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    private getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.setAuthHeader(token);
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }

    public async login(email: string, password: string): Promise<any> {
        try {
            interface LoginResponse {
                token: string;
                user: any;
            }
            const response = await this.postJson<LoginResponse>('/auth/login', { email, password });
            if (response.token) {
                this.saveToken(response.token);
            }
            return response;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async getJson<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(endpoint, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async postJson<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async putJson<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async deleteJson<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.delete<T>(endpoint, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                this.logout();
            }
            return new Error(error.response?.data?.message || 'Произошла ошибка при выполнении запроса');
        }
        return error instanceof Error ? error : new Error('Неизвестная ошибка');
    }
} 