import { defineStore } from 'pinia';
import axios, {AxiosError} from 'axios';

export const useRegisterStore = defineStore('register', {
    state: () => ({
        form: {
            username: '',
            email: '',
            birthdate: '',
            password: '',
            confirmPassword: '',
        },
        errors: {},
        loading: false,
    }),
    actions: {
        async register() {
            this.loading = true;
            this.errors = {};

            try {
                const response = await axios.post('https://api.geekportal.org/register', this.form);
                console.log('Registration successful:', response.data);
                // Можно перенаправить пользователя на страницу входа или профиля
            } catch (error: any) {
                if (error.response && error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    console.error('Registration failed:', error);
                }
            } finally {
                this.loading = false;
            }
        },
    },
});