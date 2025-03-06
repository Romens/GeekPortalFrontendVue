import axios from 'axios';
export class Api {
    static instance;
    axiosInstance;
    baseURL = 'https://api.geekportal.org';
    tokenKey = 'geekportal_auth';
    constructor() {
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
    static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }
    setAuthHeader(token) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
        this.setAuthHeader(token);
    }
    logout() {
        localStorage.removeItem(this.tokenKey);
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
    async login(email, password) {
        try {
            const response = await this.postJson('/auth/login', { email, password });
            if (response.token) {
                this.saveToken(response.token);
            }
            return response;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    async getJson(endpoint, config) {
        try {
            const response = await this.axiosInstance.get(endpoint, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    async postJson(endpoint, data, config) {
        try {
            const response = await this.axiosInstance.post(endpoint, data, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    async putJson(endpoint, data, config) {
        try {
            const response = await this.axiosInstance.put(endpoint, data, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    async deleteJson(endpoint, config) {
        try {
            const response = await this.axiosInstance.delete(endpoint, config);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    handleError(error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                this.logout();
            }
            return new Error(error.response?.data?.message || 'Произошла ошибка при выполнении запроса');
        }
        return error instanceof Error ? error : new Error('Неизвестная ошибка');
    }
}
//# sourceMappingURL=Api.js.map