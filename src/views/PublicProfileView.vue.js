import { defineComponent, onMounted, ref, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import BaseLayout from '@/layouts/BaseLayout.vue';
export default defineComponent({
    name: 'PublicProfileView',
    components: { BaseLayout },
    setup() {
        const userStore = useUserStore();
        const testEvent = ref(null);
        const wsConnection = ref(null);
        const connectionAttempts = ref(0);
        const maxRetries = 3;
        const connectionTimeout = 5000; // 5 секунд на подключение
        const initializeWebSocket = () => {
            try {
                console.log('🔄 Начинаем инициализацию WebSocket соединения...');
                console.log(`📊 Попытка подключения ${connectionAttempts.value + 1} из ${maxRetries}`);
                if (!window.Echo) {
                    console.error('❌ Echo не инициализирован!');
                    return;
                }
                // Таймер для отслеживания таймаута подключения
                const timeoutId = setTimeout(() => {
                    console.error('⏰ Таймаут подключения к WebSocket');
                    if (connectionAttempts.value < maxRetries) {
                        connectionAttempts.value++;
                        console.log('🔄 Повторная попытка подключения...');
                        initializeWebSocket();
                    }
                    else {
                        console.error('❌ Превышено максимальное количество попыток подключения');
                    }
                }, connectionTimeout);
                console.log('📡 Подключаемся к каналу test-channel...');
                const channel = window.Echo.channel('test-channel');
                console.log('✨ Канал создан:', channel);
                console.log('🔍 Состояние Echo:', {
                    connectionState: window.Echo.connector.pusher.connection.state,
                    socketId: window.Echo.socketId(),
                    options: window.Echo.options
                });
                channel
                    .listen('.test.event', (event) => {
                    console.log('📥 Событие test.event получено:', event);
                    console.log('📋 Тип события:', typeof event);
                    console.log('🔍 Структура события:', JSON.stringify(event, null, 2));
                    testEvent.value = event;
                })
                    .listen('.TokenExpired', (event) => {
                    console.warn('🔑 Токен истек:', event);
                    console.log('📊 Детали истечения токена:', {
                        timestamp: new Date().toISOString(),
                        event: event
                    });
                })
                    .subscribed(() => {
                    console.log('✅ Успешно подписались на канал test-channel');
                    clearTimeout(timeoutId); // Очищаем таймер при успешном подключении
                    connectionAttempts.value = 0; // Сбрасываем счетчик попыток
                })
                    .error((error) => {
                    console.error('❌ Ошибка WebSocket:', error);
                    console.error('🔍 Детали ошибки:', {
                        message: error.message,
                        type: error.type,
                        code: error.code,
                        timestamp: new Date().toISOString(),
                        connectionState: window.Echo?.connector?.pusher?.connection?.state
                    });
                });
                // Добавляем слушатели состояния соединения
                window.Echo.connector.pusher.connection.bind('connecting', () => {
                    console.log('🔄 Устанавливается соединение...');
                });
                window.Echo.connector.pusher.connection.bind('connected', () => {
                    console.log('✅ Соединение установлено');
                    console.log('📊 Информация о соединении:', {
                        socketId: window.Echo.socketId(),
                        timestamp: new Date().toISOString()
                    });
                });
                window.Echo.connector.pusher.connection.bind('disconnected', () => {
                    console.log('❌ Соединение разорвано');
                });
                window.Echo.connector.pusher.connection.bind('failed', () => {
                    console.error('💥 Соединение не удалось установить');
                });
            }
            catch (error) {
                console.error('💥 Критическая ошибка при инициализации WebSocket:', error);
                if (error instanceof Error) {
                    console.error('📚 Стек ошибки:', error.stack);
                    console.error('🔍 Дополнительная информация:', {
                        timestamp: new Date().toISOString(),
                        errorName: error.name,
                        errorMessage: error.message
                    });
                }
            }
        };
        const handleImageError = (e) => {
            if (e.target instanceof HTMLImageElement) {
                e.target.style.display = 'none';
                e.target.parentElement?.querySelector('span')?.classList.remove('hidden');
            }
        };
        onMounted(async () => {
            console.log('Компонент монтируется...');
            if (!userStore.user) {
                console.log('Пользователь не загружен, начинаем загрузку...');
                await userStore.fetchUserProfile();
                console.log('Профиль пользователя загружен:', userStore.user);
            }
            console.log('Запускаем инициализацию WebSocket...');
            initializeWebSocket();
        });
        onUnmounted(() => {
            console.log('Компонент размонтируется...');
            if (window.Echo) {
                console.log('Отключаем WebSocket соединение...');
                window.Echo.leaveChannel('test-channel');
                console.log('WebSocket соединение закрыто');
            }
        });
        return {
            userStore,
            testEvent,
            handleImageError
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    BaseLayout;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-4xl mx-auto px-4 py-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6") },
    });
    if (__VLS_ctx.userStore.user) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center space-x-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden") },
        });
        if (__VLS_ctx.userStore.user.photo_url) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
                ...{ onError: (__VLS_ctx.handleImageError) },
                src: ((__VLS_ctx.userStore.user.photo_url)),
                alt: ((__VLS_ctx.userStore.user.username)),
                ...{ class: ("w-full h-full object-cover") },
            });
            // @ts-ignore
            [userStore, userStore, userStore, userStore, handleImageError,];
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("w-full h-full flex items-center justify-center text-3xl") },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
            ...{ class: ("text-2xl font-bold text-gray-900 dark:text-white") },
        });
        (__VLS_ctx.userStore.user.username);
        // @ts-ignore
        [userStore,];
        if (__VLS_ctx.userStore.user.title) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("text-lg text-gray-600 dark:text-gray-300") },
            });
            (__VLS_ctx.userStore.user.title);
            // @ts-ignore
            [userStore, userStore,];
        }
        if (__VLS_ctx.userStore.user.description) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("prose dark:prose-invert") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
                ...{ class: ("text-xl font-semibold text-gray-900 dark:text-white") },
            });
            // @ts-ignore
            [userStore,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("text-gray-600 dark:text-gray-300") },
            });
            (__VLS_ctx.userStore.user.description);
            // @ts-ignore
            [userStore,];
            if (__VLS_ctx.testEvent) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: ("mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                    ...{ class: ("text-lg font-semibold text-gray-900 dark:text-white") },
                });
                // @ts-ignore
                [testEvent,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: ("mt-2 space-y-2") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                    ...{ class: ("text-sm text-gray-600 dark:text-gray-300") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("font-medium") },
                });
                (JSON.stringify(__VLS_ctx.testEvent.data));
                // @ts-ignore
                [testEvent,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                    ...{ class: ("text-sm text-gray-600 dark:text-gray-300") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("font-medium") },
                });
                (JSON.stringify(__VLS_ctx.testEvent.headers));
                // @ts-ignore
                [testEvent,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                    ...{ class: ("text-sm text-gray-600 dark:text-gray-300") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("font-medium") },
                });
                (__VLS_ctx.testEvent.timestamp);
                // @ts-ignore
                [testEvent,];
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("border-t border-gray-200 dark:border-gray-700 pt-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold text-gray-900 dark:text-white mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center space-x-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-gray-600 dark:text-gray-300") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-gray-900 dark:text-white") },
        });
        (__VLS_ctx.userStore.user.id);
        // @ts-ignore
        [userStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center space-x-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-gray-600 dark:text-gray-300") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-gray-900 dark:text-white") },
        });
        (__VLS_ctx.userStore.user.email);
        // @ts-ignore
        [userStore,];
        if (__VLS_ctx.userStore.isAdmin) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex items-center space-x-2") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("text-gray-600 dark:text-gray-300") },
            });
            // @ts-ignore
            [userStore,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("text-gray-900 dark:text-white") },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("border-t border-gray-200 dark:border-gray-700 pt-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold text-gray-900 dark:text-white mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-1 sm:grid-cols-3 gap-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-3xl font-bold text-blue-600 dark:text-blue-400") },
        });
        (__VLS_ctx.userStore.user.visited_count || 0);
        // @ts-ignore
        [userStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm text-gray-600 dark:text-gray-400") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-3xl font-bold text-purple-600 dark:text-purple-400") },
        });
        (__VLS_ctx.userStore.user.wanted_count || 0);
        // @ts-ignore
        [userStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm text-gray-600 dark:text-gray-400") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-3xl font-bold text-pink-600 dark:text-pink-400") },
        });
        (__VLS_ctx.userStore.user.favorites_count || 0);
        // @ts-ignore
        [userStore,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm text-gray-600 dark:text-gray-400") },
        });
    }
    else if (__VLS_ctx.userStore.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-center items-center h-40") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white") },
        });
        // @ts-ignore
        [userStore,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-center text-red-600 dark:text-red-400") },
        });
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['max-w-4xl', 'mx-auto', 'px-4', 'py-8', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-6', 'space-y-6', 'flex', 'items-center', 'space-x-4', 'w-20', 'h-20', 'bg-gray-200', 'dark:bg-gray-700', 'rounded-full', 'overflow-hidden', 'w-full', 'h-full', 'object-cover', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'text-3xl', 'text-2xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'text-lg', 'text-gray-600', 'dark:text-gray-300', 'prose', 'dark:prose-invert', 'text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white', 'text-gray-600', 'dark:text-gray-300', 'mt-4', 'p-4', 'bg-gray-100', 'dark:bg-gray-700', 'rounded-lg', 'text-lg', 'font-semibold', 'text-gray-900', 'dark:text-white', 'mt-2', 'space-y-2', 'text-sm', 'text-gray-600', 'dark:text-gray-300', 'font-medium', 'text-sm', 'text-gray-600', 'dark:text-gray-300', 'font-medium', 'text-sm', 'text-gray-600', 'dark:text-gray-300', 'font-medium', 'border-t', 'border-gray-200', 'dark:border-gray-700', 'pt-6', 'text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white', 'mb-4', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'flex', 'items-center', 'space-x-2', 'text-gray-600', 'dark:text-gray-300', 'text-gray-900', 'dark:text-white', 'flex', 'items-center', 'space-x-2', 'text-gray-600', 'dark:text-gray-300', 'text-gray-900', 'dark:text-white', 'flex', 'items-center', 'space-x-2', 'text-gray-600', 'dark:text-gray-300', 'text-gray-900', 'dark:text-white', 'border-t', 'border-gray-200', 'dark:border-gray-700', 'pt-6', 'text-xl', 'font-semibold', 'text-gray-900', 'dark:text-white', 'mb-4', 'grid', 'grid-cols-1', 'sm:grid-cols-3', 'gap-4', 'bg-blue-50', 'dark:bg-blue-900/20', 'p-4', 'rounded-lg', 'text-3xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'text-sm', 'text-gray-600', 'dark:text-gray-400', 'bg-purple-50', 'dark:bg-purple-900/20', 'p-4', 'rounded-lg', 'text-3xl', 'font-bold', 'text-purple-600', 'dark:text-purple-400', 'text-sm', 'text-gray-600', 'dark:text-gray-400', 'bg-pink-50', 'dark:bg-pink-900/20', 'p-4', 'rounded-lg', 'text-3xl', 'font-bold', 'text-pink-600', 'dark:text-pink-400', 'text-sm', 'text-gray-600', 'dark:text-gray-400', 'flex', 'justify-center', 'items-center', 'h-40', 'animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-gray-900', 'dark:border-white', 'text-center', 'text-red-600', 'dark:text-red-400',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
//# sourceMappingURL=PublicProfileView.vue.js.map