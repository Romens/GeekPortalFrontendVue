import { defineStore } from 'pinia';
import axios from 'axios';
export const useGeekStore = defineStore('geek', {
    state: () => ({
        places: [],
        recentPlaces: [],
        isLoading: false,
        error: null,
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
        async fetchPlaces(filters) {
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
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : 'Ошибка загрузки мест';
            }
            finally {
                this.isLoading = false;
            }
        },
        async getPlace(id) {
            this.isLoading = true;
            try {
                const response = await axios.get(`https://api.geekportal.org/places/${id}`);
                return response.data.data;
            }
            catch (error) {
                console.error('Ошибка получения места:', error);
                return null;
            }
            finally {
                this.isLoading = false;
            }
        },
        async addPlace(formData) {
            this.isLoading = true;
            try {
                const response = await axios.post('https://api.geekportal.org/places', formData, {
                    withCredentials: true,
                });
                return response.data.place;
            }
            catch (error) {
                if (axios.isAxiosError(error) && error.response?.data.errors) {
                    throw error.response.data.errors;
                }
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        },
        async updatePlace(id, formData) {
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
            }
            catch (error) {
                if (axios.isAxiosError(error) && error.response?.data.errors) {
                    throw error.response.data.errors;
                }
                throw error;
            }
            finally {
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
            }
            catch (error) {
                console.error('Ошибка загрузки последних мест:', error);
                this.error = 'Ошибка загрузки последних мест';
                throw error;
            }
            finally {
                this.isLoading = false;
            }
        }
    }
});
//# sourceMappingURL=geekStore.js.map