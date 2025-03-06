import { defineComponent, reactive, onMounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { useCacheStore } from '@/stores/cacheStore';
export default defineComponent({
    setup() {
        const geekStore = useGeekStore();
        const cacheStore = useCacheStore();
        const filters = reactive({
            search: '',
            city: '',
            category: '',
            is_adult: undefined,
        });
        onMounted(async () => {
            await cacheStore.fetchCacheData();
        });
        const applyFilters = () => {
            geekStore.fetchPlaces(filters);
        };
        const changePage = (page) => {
            geekStore.fetchPlaces({ ...filters, page });
        };
        return {
            geekStore,
            cacheStore,
            filters,
            applyFilters,
            changePage,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("filters mb-4 flex flex-col md:flex-row gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        placeholder: ("Поиск по названию"),
        ...{ class: ("p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    (__VLS_ctx.filters.search);
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.filters.city)),
        ...{ class: ("p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (""),
    });
    for (const [city] of __VLS_getVForSourceType((__VLS_ctx.cacheStore.cities))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: ((city.uuid)),
            value: ((city.name)),
        });
        (city.front_name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.filters.category)),
        ...{ class: ("p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (""),
    });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.cacheStore.categories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            key: ((category.id)),
            value: ((category.url)),
        });
        (category.front_name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.filters.is_adult)),
        ...{ class: ("p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ((null)),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ((true)),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ((false)),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.applyFilters) },
        ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: ("min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        ...{ class: ("bg-gray-200 dark:bg-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: ("py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [place] of __VLS_getVForSourceType((__VLS_ctx.geekStore.places))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: ((place.id)),
            ...{ class: ("border-b border-gray-200 dark:border-gray-700") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm text-gray-800 dark:text-gray-200") },
        });
        (place.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm text-gray-800 dark:text-gray-200") },
        });
        (__VLS_ctx.cacheStore.cities.find(city => city.name === place.city_name)?.front_name || place.city_name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm text-gray-800 dark:text-gray-200") },
        });
        (__VLS_ctx.cacheStore.categories.find(category => category.url === place.category_url)?.front_name || place.category_url);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ((place.is_active ? 'text-green-500' : 'text-red-500')) },
        });
        (place.is_active ? '✅' : '❌');
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ((place.is_adult ? 'text-green-500' : 'text-red-500')) },
        });
        (place.is_adult ? '✅' : '❌');
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: ("py-2 px-4 text-sm text-gray-800 dark:text-gray-200") },
        });
        const __VLS_0 = {}.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            to: ((`/place/${place.id}/edit`)),
            ...{ class: ("text-blue-500 hover:text-blue-700") },
        }));
        const __VLS_2 = __VLS_1({
            to: ((`/place/${place.id}/edit`)),
            ...{ class: ("text-blue-500 hover:text-blue-700") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_5.slots.default;
        var __VLS_5;
    }
    if (__VLS_ctx.geekStore.pagination) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("pagination mt-4 flex justify-between items-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.geekStore.pagination)))
                        return;
                    __VLS_ctx.changePage(__VLS_ctx.geekStore.pagination.current_page - 1);
                } },
            disabled: ((__VLS_ctx.geekStore.pagination.current_page === 1)),
            ...{ class: ("bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded transition-colors disabled:opacity-50") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm text-gray-700 dark:text-gray-300") },
        });
        (__VLS_ctx.geekStore.pagination.current_page);
        (__VLS_ctx.geekStore.pagination.last_page);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.geekStore.pagination)))
                        return;
                    __VLS_ctx.changePage(__VLS_ctx.geekStore.pagination.current_page + 1);
                } },
            disabled: ((__VLS_ctx.geekStore.pagination.current_page === __VLS_ctx.geekStore.pagination.last_page)),
            ...{ class: ("bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded transition-colors disabled:opacity-50") },
        });
    }
    ['p-4', 'filters', 'mb-4', 'flex', 'flex-col', 'md:flex-row', 'gap-4', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'px-4', 'py-2', 'rounded', 'transition-colors', 'min-w-full', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow', 'overflow-hidden', 'bg-gray-200', 'dark:bg-gray-700', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'py-2', 'px-4', 'text-left', 'text-sm', 'font-semibold', 'text-gray-700', 'dark:text-gray-300', 'border-b', 'border-gray-200', 'dark:border-gray-700', 'py-2', 'px-4', 'text-sm', 'text-gray-800', 'dark:text-gray-200', 'py-2', 'px-4', 'text-sm', 'text-gray-800', 'dark:text-gray-200', 'py-2', 'px-4', 'text-sm', 'text-gray-800', 'dark:text-gray-200', 'py-2', 'px-4', 'text-sm', 'py-2', 'px-4', 'text-sm', 'py-2', 'px-4', 'text-sm', 'text-gray-800', 'dark:text-gray-200', 'text-blue-500', 'hover:text-blue-700', 'pagination', 'mt-4', 'flex', 'justify-between', 'items-center', 'bg-gray-300', 'hover:bg-gray-400', 'text-gray-800', 'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:text-white', 'px-4', 'py-2', 'rounded', 'transition-colors', 'disabled:opacity-50', 'text-sm', 'text-gray-700', 'dark:text-gray-300', 'bg-gray-300', 'hover:bg-gray-400', 'text-gray-800', 'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:text-white', 'px-4', 'py-2', 'rounded', 'transition-colors', 'disabled:opacity-50',];
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
//# sourceMappingURL=PlacesTable.vue.js.map