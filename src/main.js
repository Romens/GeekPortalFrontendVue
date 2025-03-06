import './style.css';
import 'leaflet/dist/leaflet.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';
import App from './App.vue';
import axios from "axios";
import router from './router';
import i18n from './i18n'; // Импортируем i18n
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
window.axios = axios;
if (localStorage.getItem('geekportal_auth') !== null) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('geekportal_auth');
}
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER || 'eu',
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['wss', 'ws'],
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('https://api.geekportal.org/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                    callback(false, response.data);
                })
                    .catch(error => {
                    callback(true, error);
                });
            }
        };
    },
});
const pinia = createPinia();
const app = createApp(App);
const head = createHead();
app.use(router);
app.use(pinia);
app.use(head);
app.use(i18n); // Используем i18n
import { useThemeStore } from '@/stores/themeStore';
const themeStore = useThemeStore();
themeStore.initializeTheme();
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
app.mount('#app');
//# sourceMappingURL=main.js.map