import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";
export default defineComponent({
    name: 'AboutView',
    components: { BaseLayout },
    setup() {
        // Устанавливаем мета-теги
        useHead({
            title: 'О проекте GeekPortal',
            meta: [
                {
                    name: 'description',
                    content: 'Узнайте больше о GeekPortal — каталоге гик-мест для любителей технологий, игр и науки.',
                },
            ],
        });
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout };
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("container mx-auto px-4 py-12") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-3xl font-bold text-center mb-8") },
    });
    (__VLS_ctx.$t('about_view.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-lg text-gray-600 dark:text-gray-300 text-center") },
    });
    (__VLS_ctx.$t('about_view.subtitle'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-8 max-w-2xl mx-auto space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid md:grid-cols-2 gap-6 animate-columns-appear") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-100 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-[1.02]") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400") },
    });
    (__VLS_ctx.$t('about_view.for_geeks.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: ("space-y-3") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_geeks.items.find_places'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_geeks.items.connect'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_geeks.items.interactive_map'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-100 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-[1.02]") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold mb-4 text-green-600 dark:text-green-400") },
    });
    (__VLS_ctx.$t('about_view.for_owners.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: ("space-y-3") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_owners.items.free_advertising'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_owners.items.analytics'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("flex items-start text-gray-600 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("mr-2 mt-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.$t('about_view.for_owners.items.feedback'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-100 dark:bg-gray-800 p-6 rounded-lg animate-fade-in-up delay-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.$t('about_view.description')) }, null, null);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-8 max-w-2xl mx-auto space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-100 dark:bg-gray-800 p-6 rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-blue-400 mb-4") },
    });
    (__VLS_ctx.$t('about_view.principles.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        ...{ class: ("list-disc list-inside space-y-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.principles.items.free_for_users'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.principles.items.free_for_places'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.principles.items.preserve_memory'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.principles.items.find_like_minded'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.principles.items.no_sales'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-100 dark:bg-gray-800 p-6 rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold text-blue-400 mb-4") },
    });
    (__VLS_ctx.$t('about_view.support.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.$t('about_view.support.text'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ("https://boosty.to/nickjayrussell"),
        target: ("_blank"),
        ...{ class: ("text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline") },
    });
    (__VLS_ctx.$t('about_view.support.boosty_link'));
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12', 'text-3xl', 'font-bold', 'text-center', 'mb-8', 'text-lg', 'text-gray-600', 'dark:text-gray-300', 'text-center', 'mt-8', 'max-w-2xl', 'mx-auto', 'space-y-6', 'grid', 'md:grid-cols-2', 'gap-6', 'animate-columns-appear', 'bg-gray-100', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'transition-transform', 'hover:scale-[1.02]', 'text-xl', 'font-semibold', 'mb-4', 'text-purple-600', 'dark:text-purple-400', 'space-y-3', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'bg-gray-100', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'transition-transform', 'hover:scale-[1.02]', 'text-xl', 'font-semibold', 'mb-4', 'text-green-600', 'dark:text-green-400', 'space-y-3', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'flex', 'items-start', 'text-gray-600', 'dark:text-gray-300', 'mr-2', 'mt-1', 'bg-gray-100', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'animate-fade-in-up', 'delay-300', 'text-gray-600', 'dark:text-gray-300', 'mt-8', 'max-w-2xl', 'mx-auto', 'space-y-6', 'bg-gray-100', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'text-xl', 'font-semibold', 'text-blue-400', 'mb-4', 'list-disc', 'list-inside', 'space-y-2', 'text-gray-600', 'dark:text-gray-300', 'text-gray-600', 'dark:text-gray-300', 'text-gray-600', 'dark:text-gray-300', 'text-gray-600', 'dark:text-gray-300', 'text-gray-600', 'dark:text-gray-300', 'bg-gray-100', 'dark:bg-gray-800', 'p-6', 'rounded-lg', 'text-xl', 'font-semibold', 'text-blue-400', 'mb-4', 'text-gray-600', 'dark:text-gray-300', 'text-blue-500', 'hover:text-blue-700', 'dark:text-blue-400', 'dark:hover:text-blue-300', 'underline',];
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
//# sourceMappingURL=AboutView.vue.js.map