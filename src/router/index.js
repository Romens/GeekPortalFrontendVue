import { createRouter, createWebHistory } from 'vue-router';
import AddPlaceView from "@/views/AddPlaceView.vue";
import EditFormPlace from '@/views/EditFormPlace.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'GeekPortal',
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
            title: 'О проекте GeekPortal',
        },
    },
    {
        path: '/places',
        name: 'Places',
        component: () => import('@/views/PlacesView.vue'),
        meta: {
            title: 'Гик-места | GeekPortal',
        },
    },
    {
        path: '/places/:id',
        name: 'GeekPlaceView',
        component: () => import('@/views/GeekPlaceView.vue'),
        meta: {
            title: 'Гик-места | GeekPortal',
        },
    },
    {
        path: '/places/:uuid',
        name: 'PlacePageView',
        component: () => import('@/views/PlacePageView.vue'),
        meta: {
            title: 'GeekPortal',
        },
    },
    {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/MapView.vue'),
        meta: {
            title: 'Карта | GeekPortal',
        },
    },
    {
        path: '/register',
        name: 'Registration',
        component: () => import('@/views/RegistrationView.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/AdminView.vue'),
        meta: {
            title: 'Админ-панель | GeekPortal',
            requiresAdmin: true
        },
    },
    {
        path: '/add-geek-place',
        name: 'AddPlace',
        component: AddPlaceView,
        meta: {
            title: 'Добавить место | GeekPortal',
        },
    },
    {
        path: '/place/:id/edit',
        name: 'EditFormPlace',
        component: EditFormPlace,
        meta: {
            title: 'Изменить место | GeekPortal',
        },
    },
    {
        path: '/profile/settings',
        name: 'profile-settings',
        component: () => import('@/views/ProfileSettingsView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'PublicProfile',
        component: () => import('@/views/PublicProfileView.vue'),
        meta: {
            title: 'Профиль | GeekPortal',
            requiresAuth: true
        },
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Динамическое обновление заголовка страницы
router.beforeEach((to, from, next) => {
    const title = to.meta.title || 'GeekPortal';
    document.title = title;
    next();
});
export default router;
//# sourceMappingURL=index.js.map