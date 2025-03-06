import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useGeekStore } from '@/stores/geekStore';
import { storeToRefs } from 'pinia';
import PlacesTable from '@/components/PlacesTable.vue';
export default defineComponent({
    components: { BaseLayout, PlacesTable },
    setup() {
        const geekStore = useGeekStore();
        const { isLoading } = storeToRefs(geekStore);
        const stats = ref({
            profiles_count: 0,
            profiles_active_count: 0
        });
        onMounted(async () => {
            try {
                const [statsResponse] = await Promise.all([
                    axios.get('https://api.geekportal.org/stats')
                ]);
                stats.value = statsResponse.data;
            }
            catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        });
        return {
            stats,
            geekStore,
            isLoading
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout, PlacesTable };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.baseLayout, typeof __VLS_components.BaseLayout, typeof __VLS_components.baseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-2xl font-bold mb-6 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-4 mb-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 p-6 rounded-lg shadow") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-lg font-semibold mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-3xl dark:text-white") },
    });
    (__VLS_ctx.stats.profiles_count);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 p-6 rounded-lg shadow") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-lg font-semibold mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-3xl dark:text-white") },
    });
    (__VLS_ctx.stats.profiles_active_count);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-700 p-6 rounded-lg shadow mb-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold mb-4 dark:text-white") },
    });
    const __VLS_7 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        to: ("/add-geek-place"),
        ...{ class: ("inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4") },
    }));
    const __VLS_9 = __VLS_8({
        to: ("/add-geek-place"),
        ...{ class: ("inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_12.slots.default;
    var __VLS_12;
    if (__VLS_ctx.geekStore.recentPlaces && __VLS_ctx.geekStore.recentPlaces.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-lg font-semibold dark:text-white") },
        });
        if (__VLS_ctx.isLoading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("text-gray-500 dark:text-gray-400") },
            });
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-4") },
            });
            for (const [place] of __VLS_getVForSourceType((__VLS_ctx.geekStore.lastThreePlaces))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    key: ((place.id)),
                    ...{ class: ("bg-gray-50 dark:bg-gray-800 p-4 rounded-lg") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
                    ...{ class: ("font-medium mb-2 dark:text-white") },
                });
                (place.title);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: ("flex gap-2") },
                });
                const __VLS_13 = {}.RouterLink;
                /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                // @ts-ignore
                const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                    to: ((`/place/${place.id}/edit`)),
                    ...{ class: ("inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors") },
                }));
                const __VLS_15 = __VLS_14({
                    to: ((`/place/${place.id}/edit`)),
                    ...{ class: ("inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors") },
                }, ...__VLS_functionalComponentArgsRest(__VLS_14));
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("material-icons text-sm") },
                });
                __VLS_18.slots.default;
                var __VLS_18;
                const __VLS_19 = {}.RouterLink;
                /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
                // @ts-ignore
                const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
                    to: ((`/place/${place.id}`)),
                    ...{ class: ("inline-flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors") },
                }));
                const __VLS_21 = __VLS_20({
                    to: ((`/place/${place.id}`)),
                    ...{ class: ("inline-flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors") },
                }, ...__VLS_functionalComponentArgsRest(__VLS_20));
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("material-icons text-sm") },
                });
                __VLS_24.slots.default;
                var __VLS_24;
            }
        }
    }
    const __VLS_25 = {}.PlacesTable;
    /** @type { [typeof __VLS_components.PlacesTable, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-6', 'text-2xl', 'font-bold', 'mb-6', 'dark:text-white', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'mb-8', 'bg-white', 'dark:bg-gray-700', 'p-6', 'rounded-lg', 'shadow', 'text-lg', 'font-semibold', 'mb-2', 'dark:text-white', 'text-3xl', 'dark:text-white', 'bg-white', 'dark:bg-gray-700', 'p-6', 'rounded-lg', 'shadow', 'text-lg', 'font-semibold', 'mb-2', 'dark:text-white', 'text-3xl', 'dark:text-white', 'bg-white', 'dark:bg-gray-700', 'p-6', 'rounded-lg', 'shadow', 'mb-8', 'text-xl', 'font-semibold', 'mb-4', 'dark:text-white', 'inline-flex', 'items-center', 'gap-2', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'transition-colors', 'mb-4', 'space-y-4', 'text-lg', 'font-semibold', 'dark:text-white', 'text-gray-500', 'dark:text-gray-400', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4', 'bg-gray-50', 'dark:bg-gray-800', 'p-4', 'rounded-lg', 'font-medium', 'mb-2', 'dark:text-white', 'flex', 'gap-2', 'inline-flex', 'items-center', 'gap-1', 'bg-green-500', 'hover:bg-green-600', 'text-white', 'px-3', 'py-1', 'rounded', 'text-sm', 'transition-colors', 'material-icons', 'text-sm', 'inline-flex', 'items-center', 'gap-1', 'bg-gray-500', 'hover:bg-gray-600', 'text-white', 'px-3', 'py-1', 'rounded', 'text-sm', 'transition-colors', 'material-icons', 'text-sm',];
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
//# sourceMappingURL=AdminView.vue.js.map