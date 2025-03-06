import { telegramLoginTemp } from 'vue3-telegram-login';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import axios from "axios";
const SUPPORTED_LANGUAGES = [
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    // Добавить новый язык здесь
];
export default defineComponent({
    name: 'Navbar',
    components: {
        telegramLoginTemp,
    },
    setup() {
        const themeStore = useThemeStore();
        const userStore = useUserStore();
        const isDarkMode = ref(themeStore.isDarkMode);
        const { locale } = useI18n();
        const isLanguageTooltipOpen = ref(false);
        const isUserDropdownOpen = ref(false);
        const isMobileMenuOpen = ref(false);
        const isAuthModalOpen = ref(false);
        const loginForm = ref({
            email: '',
            password: '',
        });
        const supportedLanguages = ref(SUPPORTED_LANGUAGES);
        const currentLanguage = computed(() => {
            return supportedLanguages.value.find(lang => lang.code === locale.value) || supportedLanguages.value[0];
        });
        if (window.location.hash.startsWith('#token=')) {
            localStorage.setItem('geekportal_auth', window.location.hash.substring(7));
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.location.hash.substring(7);
            window.location.hash = '';
        }
        const toggleTheme = () => {
            themeStore.toggleTheme();
            isDarkMode.value = themeStore.isDarkMode;
        };
        const changeLanguage = (newLocale) => {
            locale.value = newLocale;
            isLanguageTooltipOpen.value = false;
            isMobileMenuOpen.value = false; // Закрываем меню после выбора языка
        };
        const handleLogin = () => {
            // Логика авторизации
            console.log('Login with:', loginForm.value);
            isAuthModalOpen.value = false; // Закрываем модальное окно после авторизации
        };
        const handleLogout = async () => {
            try {
                console.log('Начинаем процесс выхода из системы');
                const token = localStorage.getItem('geekportal_auth');
                console.log('Токен получен:', token ? 'присутствует' : 'отсутствует');
                await axios.post('https://api.geekportal.org/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Запрос на выход выполнен успешно');
                localStorage.removeItem('geekportal_auth');
                console.log('Токен удален из localStorage');
                delete axios.defaults.headers.common['Authorization'];
                console.log('Токен удален из заголовков запросов');
                userStore.$reset();
                console.log('Состояние пользователя сброшено');
                isUserDropdownOpen.value = false;
                console.log('Выпадающее меню пользователя закрыто');
            }
            catch (error) {
                console.error('Ошибка при выходе из системы:', error);
            }
        };
        // Загружаем профиль пользователя при монтировании компонента
        onMounted(() => {
            isDarkMode.value = themeStore.isDarkMode;
            axios.get('/sanctum/csrf-cookie').then(response => {
                userStore.fetchUserProfile();
            });
        });
        return {
            isDarkMode,
            toggleTheme,
            locale,
            changeLanguage,
            isLanguageTooltipOpen,
            supportedLanguages,
            currentLanguage,
            isMobileMenuOpen,
            isUserDropdownOpen,
            isAuthModalOpen,
            loginForm,
            handleLogin,
            handleLogout,
            userStore,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = {
        telegramLoginTemp,
    };
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: ("bg-white dark:bg-gray-800 shadow-md") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-between items-center h-16") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.isMobileMenuOpen = !__VLS_ctx.isMobileMenuOpen;
            } },
        ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full md:hidden") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        ...{ class: ("w-6 h-6") },
        fill: ("none"),
        stroke: ("currentColor"),
        viewBox: ("0 0 24 24"),
        xmlns: ("http://www.w3.org/2000/svg"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
        'stroke-linecap': ("round"),
        'stroke-linejoin': ("round"),
        'stroke-width': ("2"),
        d: ("M4 6h16M4 12h16m-7 6h7"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex-grow text-center md:text-left md:flex-grow-0") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/"),
        ...{ class: ("text-xl font-bold text-gray-900 dark:text-white") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/"),
        ...{ class: ("text-xl font-bold text-gray-900 dark:text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-8 md:hidden") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("hidden md:flex space-x-8 items-center") },
    });
    const __VLS_6 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        to: ("/places"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }));
    const __VLS_8 = __VLS_7({
        to: ("/places"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    (__VLS_ctx.$t('navbar.places'));
    __VLS_11.slots.default;
    var __VLS_11;
    const __VLS_12 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        to: ("/map"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }));
    const __VLS_14 = __VLS_13({
        to: ("/map"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    (__VLS_ctx.$t('navbar.map'));
    __VLS_17.slots.default;
    var __VLS_17;
    const __VLS_18 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        to: ("/about"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }));
    const __VLS_20 = __VLS_19({
        to: ("/about"),
        ...{ class: ("text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    (__VLS_ctx.$t('navbar.about'));
    __VLS_23.slots.default;
    var __VLS_23;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("hidden md:flex items-center space-x-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleTheme) },
        ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
    });
    if (__VLS_ctx.isDarkMode) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.isLanguageTooltipOpen = !__VLS_ctx.isLanguageTooltipOpen;
            } },
        ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
    });
    (__VLS_ctx.currentLanguage.flag);
    if (__VLS_ctx.isLanguageTooltipOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("py-1") },
        });
        for (const [lang] of __VLS_getVForSourceType((__VLS_ctx.supportedLanguages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.isLanguageTooltipOpen)))
                            return;
                        __VLS_ctx.changeLanguage(lang.code);
                    } },
                key: ((lang.code)),
                ...{ class: ("w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
            });
            (lang.flag);
            (lang.name);
        }
    }
    if (__VLS_ctx.userStore.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center space-x-2") },
        });
        if (__VLS_ctx.userStore.isAuthenticated) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex items-center space-x-2 relative") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.userStore.isAuthenticated)))
                            return;
                        if (!((__VLS_ctx.userStore.isAuthenticated)))
                            return;
                        __VLS_ctx.isUserDropdownOpen = !__VLS_ctx.isUserDropdownOpen;
                    } },
                ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
            });
            (__VLS_ctx.userStore.user?.username);
            if (__VLS_ctx.isUserDropdownOpen) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.userStore.isAuthenticated)))
                                return;
                            if (!((__VLS_ctx.userStore.isAuthenticated)))
                                return;
                            if (!((__VLS_ctx.isUserDropdownOpen)))
                                return;
                            __VLS_ctx.isUserDropdownOpen = false;
                        } },
                    ...{ class: ("absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: ("py-1") },
                });
                const __VLS_24 = {}.RouterLink;
                /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                // @ts-ignore
                const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                    to: ("/profile"),
                    ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                }));
                const __VLS_26 = __VLS_25({
                    to: ("/profile"),
                    ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                }, ...__VLS_functionalComponentArgsRest(__VLS_25));
                (__VLS_ctx.$t('navbar.profile'));
                __VLS_29.slots.default;
                var __VLS_29;
                const __VLS_30 = {}.RouterLink;
                /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                // @ts-ignore
                const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
                    to: ("/profile/settings"),
                    ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                }));
                const __VLS_32 = __VLS_31({
                    to: ("/profile/settings"),
                    ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                (__VLS_ctx.$t('navbar.profile_settings'));
                __VLS_35.slots.default;
                var __VLS_35;
                if (__VLS_ctx.userStore.isAdmin) {
                    const __VLS_36 = {}.RouterLink;
                    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                    // @ts-ignore
                    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
                        to: ("/admin"),
                        ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                    }));
                    const __VLS_38 = __VLS_37({
                        to: ("/admin"),
                        ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
                    (__VLS_ctx.$t('navbar.admin'));
                    __VLS_41.slots.default;
                    var __VLS_41;
                }
                if (__VLS_ctx.userStore.isAdmin || __VLS_ctx.userStore.isManager) {
                    const __VLS_42 = {}.RouterLink;
                    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                    // @ts-ignore
                    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
                        to: ("/add-geek-place"),
                        ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                    }));
                    const __VLS_44 = __VLS_43({
                        to: ("/add-geek-place"),
                        ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
                    (__VLS_ctx.$t('navbar.add_place'));
                    __VLS_47.slots.default;
                    var __VLS_47;
                }
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (__VLS_ctx.handleLogout) },
                    ...{ class: ("w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600") },
                });
                (__VLS_ctx.$t('navbar.logout'));
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!((__VLS_ctx.userStore.isAuthenticated))))
                        return;
                    __VLS_ctx.isAuthModalOpen = true;
                } },
            ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
        });
    }
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isMobileMenuOpen)))
                        return;
                    __VLS_ctx.isMobileMenuOpen = false;
                } },
            ...{ class: ("fixed inset-0 bg-black opacity-50 z-40 md:hidden") },
        });
    }
    if (__VLS_ctx.isMobileMenuOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col h-full p-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center justify-between mb-4") },
        });
        const __VLS_48 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            ...{ 'onClick': {} },
            to: ("/"),
            ...{ class: ("text-xl font-bold text-gray-900 dark:text-white") },
        }));
        const __VLS_50 = __VLS_49({
            ...{ 'onClick': {} },
            to: ("/"),
            ...{ class: ("text-xl font-bold text-gray-900 dark:text-white") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        let __VLS_54;
        const __VLS_55 = {
            onClick: (...[$event]) => {
                if (!((__VLS_ctx.isMobileMenuOpen)))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            }
        };
        let __VLS_51;
        let __VLS_52;
        __VLS_53.slots.default;
        var __VLS_53;
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isMobileMenuOpen)))
                        return;
                    __VLS_ctx.isMobileMenuOpen = false;
                } },
            ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-6 h-6") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
            xmlns: ("http://www.w3.org/2000/svg"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M6 18L18 6M6 6l12 12"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex-grow") },
        });
        const __VLS_56 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            ...{ 'onClick': {} },
            to: ("/places"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }));
        const __VLS_58 = __VLS_57({
            ...{ 'onClick': {} },
            to: ("/places"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        let __VLS_62;
        const __VLS_63 = {
            onClick: (...[$event]) => {
                if (!((__VLS_ctx.isMobileMenuOpen)))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            }
        };
        let __VLS_59;
        let __VLS_60;
        (__VLS_ctx.$t('navbar.places'));
        __VLS_61.slots.default;
        var __VLS_61;
        const __VLS_64 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            ...{ 'onClick': {} },
            to: ("/map"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }));
        const __VLS_66 = __VLS_65({
            ...{ 'onClick': {} },
            to: ("/map"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        let __VLS_70;
        const __VLS_71 = {
            onClick: (...[$event]) => {
                if (!((__VLS_ctx.isMobileMenuOpen)))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            }
        };
        let __VLS_67;
        let __VLS_68;
        (__VLS_ctx.$t('navbar.map'));
        __VLS_69.slots.default;
        var __VLS_69;
        const __VLS_72 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
            ...{ 'onClick': {} },
            to: ("/about"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }));
        const __VLS_74 = __VLS_73({
            ...{ 'onClick': {} },
            to: ("/about"),
            ...{ class: ("block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        let __VLS_78;
        const __VLS_79 = {
            onClick: (...[$event]) => {
                if (!((__VLS_ctx.isMobileMenuOpen)))
                    return;
                __VLS_ctx.isMobileMenuOpen = false;
            }
        };
        let __VLS_75;
        let __VLS_76;
        (__VLS_ctx.$t('navbar.about'));
        __VLS_77.slots.default;
        var __VLS_77;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("border-t border-gray-200 dark:border-gray-600 pt-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col space-y-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.toggleTheme) },
            ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
        });
        if (__VLS_ctx.isDarkMode) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isMobileMenuOpen)))
                        return;
                    __VLS_ctx.isAuthModalOpen = true;
                } },
            ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
        });
    }
    if (__VLS_ctx.isAuthModalOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-between items-center mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-bold text-gray-900 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.isAuthModalOpen)))
                        return;
                    __VLS_ctx.isAuthModalOpen = false;
                } },
            ...{ class: ("p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-6 h-6") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
            xmlns: ("http://www.w3.org/2000/svg"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M6 18L18 6M6 6l12 12"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-between items-center mb-4") },
        });
        const __VLS_80 = {}.TelegramLoginTemp;
        /** @type { [typeof __VLS_components.TelegramLoginTemp, typeof __VLS_components.telegramLoginTemp, ] } */ ;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
            mode: ("redirect"),
            telegramLogin: ("geekportalbot"),
            redirectUrl: ("https://api.geekportal.org/login/telegram"),
        }));
        const __VLS_82 = __VLS_81({
            mode: ("redirect"),
            telegramLogin: ("geekportalbot"),
            redirectUrl: ("https://api.geekportal.org/login/telegram"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
            ...{ onSubmit: (__VLS_ctx.handleLogin) },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (false) }, null, null);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: ("email"),
            ...{ class: ("block text-sm font-medium text-gray-700 dark:text-gray-300") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("email"),
            id: ("email"),
            ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white") },
            required: (true),
        });
        (__VLS_ctx.loginForm.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: ("password"),
            ...{ class: ("block text-sm font-medium text-gray-700 dark:text-gray-300") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("password"),
            id: ("password"),
            ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white") },
            required: (true),
        });
        (__VLS_ctx.loginForm.password);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: ("submit"),
            ...{ class: ("w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500") },
        });
    }
    ['bg-white', 'dark:bg-gray-800', 'shadow-md', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'flex', 'justify-between', 'items-center', 'h-16', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'md:hidden', 'w-6', 'h-6', 'flex-grow', 'text-center', 'md:text-left', 'md:flex-grow-0', 'text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'w-8', 'md:hidden', 'hidden', 'md:flex', 'space-x-8', 'items-center', 'text-gray-900', 'dark:text-white', 'hover:text-gray-700', 'dark:hover:text-gray-300', 'text-gray-900', 'dark:text-white', 'hover:text-gray-700', 'dark:hover:text-gray-300', 'text-gray-900', 'dark:text-white', 'hover:text-gray-700', 'dark:hover:text-gray-300', 'hidden', 'md:flex', 'items-center', 'space-x-4', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'relative', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'absolute', 'right-0', 'mt-2', 'w-48', 'bg-white', 'dark:bg-gray-700', 'border', 'border-gray-200', 'dark:border-gray-600', 'rounded-md', 'shadow-lg', 'z-50', 'py-1', 'w-full', 'px-4', 'py-2', 'text-left', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'flex', 'items-center', 'space-x-2', 'flex', 'items-center', 'space-x-2', 'relative', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'absolute', 'right-0', 'top-full', 'mt-2', 'w-48', 'bg-white', 'dark:bg-gray-700', 'border', 'border-gray-200', 'dark:border-gray-600', 'rounded-md', 'shadow-lg', 'z-50', 'py-1', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'w-full', 'text-left', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40', 'md:hidden', 'fixed', 'inset-y-0', 'left-0', 'w-64', 'bg-white', 'dark:bg-gray-800', 'shadow-lg', 'z-50', 'md:hidden', 'transform', 'transition-transform', 'duration-300', 'ease-in-out', 'flex', 'flex-col', 'h-full', 'p-4', 'flex', 'items-center', 'justify-between', 'mb-4', 'text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'w-6', 'h-6', 'flex-grow', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'block', 'px-4', 'py-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'border-t', 'border-gray-200', 'dark:border-gray-600', 'pt-4', 'flex', 'flex-col', 'space-y-4', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-6', 'w-96', 'flex', 'justify-between', 'items-center', 'mb-4', 'text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'w-6', 'h-6', 'flex', 'justify-between', 'items-center', 'mb-4', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-600', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'dark:bg-gray-700', 'dark:text-white', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'dark:border-gray-600', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'dark:bg-gray-700', 'dark:text-white', 'w-full', 'bg-indigo-600', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-indigo-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500',];
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
//# sourceMappingURL=Navbar.vue.js.map