import { defineComponent } from 'vue';
import Jumbotron from '@/components/Jumbotron.vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";
export default defineComponent({
    name: 'HomeView',
    components: {
        BaseLayout,
        Jumbotron,
    },
    setup() {
        // Устанавливаем мета-теги
        useHead({
            title: 'GeekPortal',
            meta: [
                {
                    name: 'description',
                    content: 'GeekPortal — лучший каталог гик-мест в вашем городе. Найдите кафе, магазины и коворкинги для гиков.',
                },
            ],
        });
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = {
        BaseLayout,
        Jumbotron,
    };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = {}.Jumbotron;
    /** @type { [typeof __VLS_components.Jumbotron, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        transPrefix: (('home_view.jumbotron')),
    }));
    const __VLS_9 = __VLS_8({
        transPrefix: (('home_view.jumbotron')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("container mx-auto px-4 py-12") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-start bg-blue-50 p-4 rounded-lg border border-blue-300 border-l-4 border-l-blue-400") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-3 text-blue-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-blue-800") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm leading-relaxed") },
    });
    (__VLS_ctx.$t('home_view.info_message'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-3xl font-bold text-center mb-8") },
    });
    (__VLS_ctx.$t('home_view.welcome_title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-lg text-gray-600 dark:text-gray-300 text-center") },
    });
    (__VLS_ctx.$t('home_view.welcome_subtitle'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-8 mt-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-xl font-semibold mb-4") },
    });
    (__VLS_ctx.$t('home_view.categories.cafe.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('home_view.categories.cafe.description'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-xl font-semibold mb-4") },
    });
    (__VLS_ctx.$t('home_view.categories.shops.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('home_view.categories.shops.description'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-xl font-semibold mb-4") },
    });
    (__VLS_ctx.$t('home_view.categories.coworking.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('home_view.categories.coworking.description'));
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12', 'flex', 'items-start', 'bg-blue-50', 'p-4', 'rounded-lg', 'border', 'border-blue-300', 'border-l-4', 'border-l-blue-400', 'mr-3', 'text-blue-500', 'text-blue-800', 'text-sm', 'leading-relaxed', 'text-3xl', 'font-bold', 'text-center', 'mb-8', 'text-lg', 'text-gray-600', 'dark:text-gray-300', 'text-center', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8', 'mt-8', 'bg-white', 'dark:bg-gray-700', 'shadow-lg', 'rounded-lg', 'p-6', 'text-xl', 'font-semibold', 'mb-4', 'text-gray-600', 'dark:text-gray-300', 'bg-white', 'dark:bg-gray-700', 'shadow-lg', 'rounded-lg', 'p-6', 'text-xl', 'font-semibold', 'mb-4', 'text-gray-600', 'dark:text-gray-300', 'bg-white', 'dark:bg-gray-700', 'shadow-lg', 'rounded-lg', 'p-6', 'text-xl', 'font-semibold', 'mb-4', 'text-gray-600', 'dark:text-gray-300',];
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
//# sourceMappingURL=HomeView.vue.js.map