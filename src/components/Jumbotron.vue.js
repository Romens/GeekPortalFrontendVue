import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Jumbotron',
    props: {
        transPrefix: {
            type: String,
            required: true, // Обязательный пропс
        },
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative h-[600px] flex items-center justify-center bg-cover bg-center text-gray-900 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 bg-[url('@/assets/simple-bg.jpg')] bg-cover bg-center brightness-50 dark:brightness-75") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative z-10 text-center max-w-4xl px-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-5xl md:text-6xl font-bold mb-6 animate-fade-in") },
    });
    (__VLS_ctx.$t(`${__VLS_ctx.transPrefix}.title`));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-xl md:text-2xl mb-8 animate-fade-in delay-100") },
    });
    (__VLS_ctx.$t(`${__VLS_ctx.transPrefix}.subtitle`));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-x-4 animate-fade-in delay-200") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/places"),
        ...{ class: ("inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/places"),
        ...{ class: ("inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    (__VLS_ctx.$t(`${__VLS_ctx.transPrefix}.search_button`));
    __VLS_5.slots.default;
    var __VLS_5;
    const __VLS_6 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        to: ("/about"),
        ...{ class: ("inline-block bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300  dark:hover:bg-gray-900 dark:hover:text-white") },
    }));
    const __VLS_8 = __VLS_7({
        to: ("/about"),
        ...{ class: ("inline-block bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300  dark:hover:bg-gray-900 dark:hover:text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    (__VLS_ctx.$t(`${__VLS_ctx.transPrefix}.learn_more_button`));
    __VLS_11.slots.default;
    var __VLS_11;
    ['relative', 'h-[600px]', 'flex', 'items-center', 'justify-center', 'bg-cover', 'bg-center', 'text-gray-900', 'dark:text-white', 'absolute', 'inset-0', 'bg-[url(\'@/assets/simple-bg.jpg\')]', 'bg-cover', 'bg-center', 'brightness-50', 'dark:brightness-75', 'relative', 'z-10', 'text-center', 'max-w-4xl', 'px-4', 'text-5xl', 'md:text-6xl', 'font-bold', 'mb-6', 'animate-fade-in', 'text-xl', 'md:text-2xl', 'mb-8', 'animate-fade-in', 'delay-100', 'space-x-4', 'animate-fade-in', 'delay-200', 'inline-block', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'font-semibold', 'py-3', 'px-6', 'rounded-lg', 'transition', 'duration-300', 'inline-block', 'bg-transparent', 'border-2', 'border-white', 'hover:bg-white', 'hover:text-gray-900', 'text-white', 'font-semibold', 'py-3', 'px-6', 'rounded-lg', 'transition', 'duration-300', 'dark:hover:bg-gray-900', 'dark:hover:text-white',];
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
//# sourceMappingURL=Jumbotron.vue.js.map