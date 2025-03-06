import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
    title?: string;
    description?: string;
    photo_url?: string;
    visited_count?: number;
    wanted_count?: number;
    favorites_count?: number;
    roles?: { name: string }[];
}

interface ProfileUpdateData {
    title: string;
    description: string;
    photo?: File;
    photo_url?: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        async fetchUserProfile() {
            this.isLoading = true;
            this.error = null;

            // Восстанавливаем токен из localStorage
            const token = localStorage.getItem('geekportal_auth');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            try {
                const response = await axios.get('https://api.geekportal.org/geek', {
                    withCredentials: true,
                });

                if (response.data) {
                    this.user = response.data.user || null;
                    console.debug('Пользователь получен!', response.data.user);
                } else {
                    console.info(response);
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Ошибка при загрузке профиля';
                // Если получаем 401, очищаем токен
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem('geekportal_auth');
                    delete axios.defaults.headers.common['Authorization'];
                }
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async updateProfile(data: ProfileUpdateData) {
            this.isLoading = true;
            this.error = null;

            try {
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('description', data.description);
                
                if (data.photo) {
                    formData.append('photo', data.photo);
                } else if (data.photo_url) {
                    formData.append('photo_url', data.photo_url);
                }

                const response = await axios.post('https://api.geekportal.org/geek', formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data && response.data.user) {
                    this.user = response.data.user;
                    console.debug('Профиль обновлен!', response.data.user);
                }
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Ошибка при обновлении профиля';
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        clearUser() {
            this.user = null;
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => state.user?.roles?.some(role => role.name === 'admin'),
        isManager: (state) => state.user?.roles?.some(role => role.name === 'manager'),
    },
});