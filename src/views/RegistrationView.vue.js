import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/themeStore';
import { useRegisterStore } from '@/stores/registerStore';
const { t, locale } = useI18n();
const themeStore = useThemeStore();
const registerStore = useRegisterStore();
const { form, errors, loading } = registerStore;
const isDarkMode = ref(themeStore.isDarkMode);
const isLanguageTooltipOpen = ref(false);
const SUPPORTED_LANGUAGES = [
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
];
const supportedLanguages = ref(SUPPORTED_LANGUAGES);
const currentLanguage = computed(() => {
    return supportedLanguages.value.find(lang => lang.code === locale.value) || supportedLanguages.value[0];
});
const toggleTheme = () => {
    themeStore.toggleTheme();
    isDarkMode.value = themeStore.isDarkMode;
};
const changeLanguage = (newLocale) => {
    locale.value = newLocale;
    isLanguageTooltipOpen.value = false;
};
const handleSubmit = async () => {
    await registerStore.register();
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen flex flex-col items-center justify-center bg-black dark:bg-gray-900") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/"),
    }));
    const __VLS_2 = __VLS_1({
        to: ("/"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ("/long_logo.png"),
        alt: ("Logo"),
        ...{ class: ("mb-8 w-48") },
    });
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: ("bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mx-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("username"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-white") },
    });
    (__VLS_ctx.$t('registration_view.username.label'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        value: ((__VLS_ctx.form.username)),
        type: ("text"),
        id: ("username"),
        ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500") },
        minlength: ("4"),
        maxlength: ("70"),
        required: (true),
    });
    if (__VLS_ctx.errors.username) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-red-500") },
        });
        (__VLS_ctx.errors.username);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email"),
        ...{ class: ("block text-sm font-medium text-gray-700  dark:text-white") },
    });
    (__VLS_ctx.$t('registration_view.email.label'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("email"),
        autocomplete: ("username"),
        id: ("email"),
        ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500") },
        required: (true),
    });
    (__VLS_ctx.form.email);
    if (__VLS_ctx.errors.email) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-red-500") },
        });
        (__VLS_ctx.errors.email);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("birthdate"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-white") },
    });
    (__VLS_ctx.$t('registration_view.birthdate.label'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("date"),
        id: ("birthdate"),
        ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white focus:ring-indigo-500 focus:border-indigo-500") },
        required: (true),
    });
    (__VLS_ctx.form.birthdate);
    if (__VLS_ctx.errors.birthdate) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-red-500") },
        });
        (__VLS_ctx.errors.birthdate);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("password"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-white") },
    });
    (__VLS_ctx.$t('registration_view.password.label'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("password"),
        autocomplete: ("new-password"),
        id: ("password"),
        ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500") },
        minlength: ("8"),
        required: (true),
    });
    (__VLS_ctx.form.password);
    if (__VLS_ctx.errors.password) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-red-500") },
        });
        (__VLS_ctx.errors.password);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("confirmPassword"),
        ...{ class: ("block text-sm font-medium text-gray-700 dark:text-white") },
    });
    (__VLS_ctx.$t('registration_view.confirm_password.label'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("password"),
        autocomplete: ("new-password"),
        id: ("confirmPassword"),
        ...{ class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500") },
        required: (true),
    });
    (__VLS_ctx.form.confirmPassword);
    if (__VLS_ctx.errors.confirmPassword) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-red-500") },
        });
        (__VLS_ctx.errors.confirmPassword);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2") },
        disabled: ((__VLS_ctx.loading)),
    });
    (__VLS_ctx.loading ? 'Регистрация...' : __VLS_ctx.$t('registration_view.submit_button'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-6 flex justify-center space-x-4") },
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
    ['min-h-screen', 'flex', 'flex-col', 'items-center', 'justify-center', 'bg-black', 'dark:bg-gray-900', 'mb-8', 'w-48', 'bg-white', 'dark:bg-gray-800', 'p-8', 'rounded-lg', 'shadow-md', 'w-full', 'max-w-md', 'mx-4', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-white', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'text-sm', 'text-red-500', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-white', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'text-sm', 'text-red-500', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-white', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'dark:text-white', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'text-sm', 'text-red-500', 'mb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-white', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'text-sm', 'text-red-500', 'mb-6', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-white', 'mt-1', 'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'text-sm', 'text-red-500', 'w-full', 'bg-indigo-600', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-indigo-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500', 'focus:ring-offset-2', 'mt-6', 'flex', 'justify-center', 'space-x-4', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'relative', 'p-2', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'rounded-full', 'absolute', 'right-0', 'mt-2', 'w-48', 'bg-white', 'dark:bg-gray-700', 'border', 'border-gray-200', 'dark:border-gray-600', 'rounded-md', 'shadow-lg', 'z-50', 'py-1', 'w-full', 'px-4', 'py-2', 'text-left', 'text-gray-900', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-gray-600',];
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
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            errors: errors,
            loading: loading,
            isDarkMode: isDarkMode,
            isLanguageTooltipOpen: isLanguageTooltipOpen,
            supportedLanguages: supportedLanguages,
            currentLanguage: currentLanguage,
            toggleTheme: toggleTheme,
            changeLanguage: changeLanguage,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=RegistrationView.vue.js.map