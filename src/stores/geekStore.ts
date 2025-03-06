import { defineStore } from 'pinia';
import axios from 'axios';

interface GeekPlace {
    id: number;
    title: string;
    description: string;
    text: string | null;
    logo: string | null;
    logo_url: string | null;
    photo: string | null;
    photo_url: string | null;
    latitude: number;
    longitude: number;
    url: string | null;
    category_url: string | null;
    city_name: string;
    is_adult: boolean;
    open_text: string | null;
    work_time: string | null;
    address: string;
    address_full: string;
    is_active: boolean;
    created_at: string;
}

export const useGeekStore = defineStore('geek', {
    state: () => ({
        places: [] as GeekPlace[],
        recentPlaces: [] as GeekPlace[],
        isLoading: false,
        error: null as string | null,
        pagination: {
            current_page: 1,
            last_page: 1,
            total: 0,
        },
    }),

    getters: {
        lastThreePlaces: (state) => {
            return state.recentPlaces.slice(0, 3);
        }
    },

    actions: {
        async fetchPlaces(filters: { city?: string; category?: string; search?: string; is_adult?: boolean; page?: number }) {
            
            console.log(filters, 'filters store');
            this.isLoading = true;
            console.log(filters, 'filters');
            try {
                const response = await axios.get('https://api.geekportal.org/places', {
                    params: filters
                });
                console.log(filters, 'filters');
                this.places = response.data.data;
                this.pagination = {
                    current_page: response.data.meta.current_page || 1,
                    last_page: response.data.meta.last_page || 1,
                    total: response.data.meta.total || 0,
                };
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Ошибка загрузки мест';
            } finally {
                this.isLoading = false;
            }
        },

        async getPlace(id: string): Promise<GeekPlace | null> {
            this.isLoading = true;
            try {
                const response = await axios.get(`https://api.geekportal.org/places/${id}`);
                return response.data.data;
            } catch (error) {
                console.error('Ошибка получения места:', error);
                return null;
            } finally {
                this.isLoading = false;
            }
        },

        async addPlace(formData: FormData) {
            this.isLoading = true;
            try {
                const response = await axios.post('https://api.geekportal.org/places', formData, {
                    withCredentials: true,
                });
                return response.data.place;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data.errors) {
                    throw error.response.data.errors;
                }
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async updatePlace(id: string, formData: FormData) {
            this.isLoading = true;
            try {
                formData.append('_method', 'PUT');
                const response = await axios.post(`https://api.geekportal.org/places/${id}`, formData, {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                return response.data.place;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data.errors) {
                    throw error.response.data.errors;
                }
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async fetchRecentPlaces() {
            this.isLoading = true;
            try {
                const response = await axios.get('https://api.geekportal.org/places', {
                    params: {
                        page: 1,
                        per_page: 3,
                        sort: '-created_at'
                    }
                });
                this.recentPlaces = response.data.data;
                return response.data.data;
            } catch (error) {
                console.error('Ошибка загрузки последних мест:', error);
                this.error = 'Ошибка загрузки последних мест';
                throw error;
            } finally {
                this.isLoading = false;
            }
        }
    }
});