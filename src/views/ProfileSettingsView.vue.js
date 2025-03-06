import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import BaseLayout from '@/layouts/BaseLayout.vue';
import AlertMessage from '@/components/AlertMessage.vue';
export default defineComponent({
    components: { BaseLayout, AlertMessage },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        const form = reactive({
            title: '',
            description: '',
            photo_url: ''
        });
        const errors = ref({});
        const alert = reactive({
            show: false,
            message: '',
            type: 'success'
        });
        const showAlert = (message, type) => {
            alert.show = true;
            alert.message = message;
            alert.type = type;
            setTimeout(() => {
                alert.show = false;
            }, 3000);
        };
        onMounted(async () => {
            try {
                await userStore.fetchUserProfile();
                if (userStore.user) {
                    form.title = userStore.user.title || '';
                    form.description = userStore.user.description || '';
                    form.photo_url = userStore.user.photo_url || '';
                }
            }
            catch (error) {
                showAlert('Не удалось загрузить данные профиля', 'danger');
            }
        });
        const saveProfile = async () => {
            try {
                const formData = { ...form };
                // Если есть файл для загрузки, удаляем photo_url из запроса
                if (formData.photo) {
                    formData.photo_url = undefined;
                }
                await userStore.updateProfile(formData);
                showAlert('Профиль успешно обновлен', 'success');
            }
            catch (error) {
                showAlert('Ошибка при обновлении профиля', 'danger');
                if (error && typeof error === 'object') {
                    errors.value = error;
                }
            }
        };
        const handleImageError = (e) => {
            if (e.target instanceof HTMLImageElement) {
                e.target.style.display = 'none';
            }
        };
        const handleFileUpload = async (e) => {
            const target = e.target;
            if (target.files?.[0]) {
                const file = target.files[0];
                form.photo = file;
            }
        };
        return {
            form,
            errors,
            userStore,
            router,
            alert,
            saveProfile,
            handleImageError,
            handleFileUpload
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout, AlertMessage };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-6 max-w-2xl mx-auto") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-2xl font-bold mb-6 dark:text-white") },
    });
    const __VLS_7 = {}.AlertMessage;
    /** @type { [typeof __VLS_components.AlertMessage, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        show: ((__VLS_ctx.alert.show)),
        message: ((__VLS_ctx.alert.message)),
        type: ((__VLS_ctx.alert.type)),
    }));
    const __VLS_9 = __VLS_8({
        show: ((__VLS_ctx.alert.show)),
        message: ((__VLS_ctx.alert.message)),
        type: ((__VLS_ctx.alert.type)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.saveProfile) },
        ...{ class: ("space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        value: ((__VLS_ctx.form.title)),
        type: ("text"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        placeholder: ("Введите название профиля"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-red-500 text-sm") },
    });
    (__VLS_ctx.errors.title?.[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        value: ((__VLS_ctx.form.description)),
        rows: ("4"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        placeholder: ("Расскажите о себе"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-red-500 text-sm") },
    });
    (__VLS_ctx.errors.description?.[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    if (__VLS_ctx.form.photo_url) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            ...{ onError: (__VLS_ctx.handleImageError) },
            src: ((__VLS_ctx.form.photo_url)),
            alt: ("Предпросмотр фото профиля"),
            ...{ class: ("w-32 h-32 object-cover rounded-lg") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleFileUpload) },
        type: ("file"),
        accept: ("image/*"),
        ...{ class: ("\u006d\u0062\u002d\u0032\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0039\u0030\u0030\u0020\u0064\u0061\u0072\u006b\u003a\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u0069\u006c\u0065\u003a\u006d\u0072\u002d\u0034\u0020\u0066\u0069\u006c\u0065\u003a\u0070\u0079\u002d\u0032\u0020\u0066\u0069\u006c\u0065\u003a\u0070\u0078\u002d\u0034\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u0069\u006c\u0065\u003a\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0066\u0075\u006c\u006c\u0020\u0066\u0069\u006c\u0065\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u0069\u006c\u0065\u003a\u0074\u0065\u0078\u0074\u002d\u0073\u006d\u0020\u0066\u0069\u006c\u0065\u003a\u0066\u006f\u006e\u0074\u002d\u0073\u0065\u006d\u0069\u0062\u006f\u006c\u0064\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u0069\u006c\u0065\u003a\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0035\u0030\u0020\u0066\u0069\u006c\u0065\u003a\u0074\u0065\u0078\u0074\u002d\u0062\u006c\u0075\u0065\u002d\u0037\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0066\u0069\u006c\u0065\u003a\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0031\u0030\u0030\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0061\u0072\u006b\u003a\u0066\u0069\u006c\u0065\u003a\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0037\u0030\u0030\u0020\u0064\u0061\u0072\u006b\u003a\u0066\u0069\u006c\u0065\u003a\u0074\u0065\u0078\u0074\u002d\u0067\u0072\u0061\u0079\u002d\u0032\u0030\u0030") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("url"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        placeholder: ("Или введите URL фотографии"),
    });
    (__VLS_ctx.form.photo_url);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-red-500 text-sm") },
    });
    (__VLS_ctx.errors.photo_url?.[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors") },
        disabled: ((__VLS_ctx.userStore.isLoading)),
    });
    (__VLS_ctx.userStore.isLoading ? 'Сохранение...' : 'Сохранить изменения');
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.router.back();
            } },
        type: ("button"),
        ...{ class: ("bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors") },
    });
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-6', 'max-w-2xl', 'mx-auto', 'text-2xl', 'font-bold', 'mb-6', 'dark:text-white', 'space-y-6', 'space-y-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'block', 'mb-2', 'dark:text-white', 'mb-4', 'w-32', 'h-32', 'object-cover', 'rounded-lg', 'mb-2', 'block', 'w-full', 'text-sm', 'text-gray-900', 'dark:text-gray-300', 'file:mr-4', 'file:py-2', 'file:px-4', 'file:rounded-full', 'file:border-0', 'file:text-sm', 'file:font-semibold', 'file:bg-blue-50', 'file:text-blue-700', 'hover:file:bg-blue-100', 'dark:file:bg-gray-700', 'dark:file:text-gray-200', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'flex', 'gap-4', 'bg-blue-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'hover:bg-blue-600', 'transition-colors', 'bg-gray-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'hover:bg-gray-600', 'transition-colors',];
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
//# sourceMappingURL=ProfileSettingsView.vue.js.map