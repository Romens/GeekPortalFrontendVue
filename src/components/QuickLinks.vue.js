import { defineComponent, onMounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { storeToRefs } from 'pinia';
export default defineComponent({
    name: 'QuickLinks',
    setup() {
        const geekStore = useGeekStore();
        const { isLoading } = storeToRefs(geekStore);
        onMounted(async () => {
            try {
                await geekStore.fetchRecentPlaces();
            }
            catch (error) {
                console.error('Ошибка при загрузке последних мест:', error);
            }
        });
        return {
            geekStore,
            isLoading
        };
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("fixed bottom-4 right-4 flex flex-col gap-2") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/add-geek-place"),
        ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/add-geek-place"),
        ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_5.slots.default;
    var __VLS_5;
    if (__VLS_ctx.geekStore.recentPlaces && __VLS_ctx.geekStore.recentPlaces.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-sm font-semibold text-gray-700 dark:text-gray-300") },
        });
        if (__VLS_ctx.isLoading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("text-sm text-gray-500") },
            });
        }
        else {
            for (const [place] of __VLS_getVForSourceType((__VLS_ctx.geekStore.lastThreePlaces))) {
                const __VLS_6 = {}.RouterLink;
                /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                // @ts-ignore
                const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
                    key: ((place.id)),
                    to: ((`/place/${place.id}/edit`)),
                    ...{ class: ("block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors") },
                }));
                const __VLS_8 = __VLS_7({
                    key: ((place.id)),
                    to: ((`/place/${place.id}/edit`)),
                    ...{ class: ("block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors") },
                }, ...__VLS_functionalComponentArgsRest(__VLS_7));
                (place.title);
                __VLS_11.slots.default;
                var __VLS_11;
            }
        }
    }
    ['fixed', 'bottom-4', 'right-4', 'flex', 'flex-col', 'gap-2', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'gap-2', 'transition-colors', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-4', 'space-y-2', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'text-sm', 'text-gray-500', 'block', 'bg-gray-100', 'dark:bg-gray-700', 'hover:bg-gray-200', 'dark:hover:bg-gray-600', 'px-3', 'py-2', 'rounded', 'text-sm', 'transition-colors',];
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
//# sourceMappingURL=QuickLinks.vue.js.map