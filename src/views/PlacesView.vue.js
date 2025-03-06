import { defineComponent, ref, onMounted } from 'vue';
import PlaceCard from "@/components/PlaceCard.vue";
import TextQuerySearch from "@/components/TextQuerySearch.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
export default defineComponent({
    name: 'PlacesView',
    components: {
        BaseLayout,
        TextQuerySearch,
        PlaceCard,
    },
    metaInfo: {
        title: 'Гик-места | GeekPortal',
        meta: [
            {
                name: 'description',
                content: 'Исследуйте лучшие гик-места в вашем городе с GeekPortal. Кафе, магазины, коворкинги и многое другое.',
            },
        ],
    },
    setup() {
        const places = ref([]);
        // Загрузка данных из JSON
        onMounted(async () => {
            const response = await fetch('/places/places_spb.json');
            places.value = await response.json();
        });
        return {
            places,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = {
        BaseLayout,
        TextQuerySearch,
        PlaceCard,
    };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("container mx-auto px-4 py-12") },
    });
    const __VLS_7 = {}.TextQuerySearch;
    /** @type { [typeof __VLS_components.TextQuerySearch, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-3xl font-bold text-center mb-8") },
    });
    (__VLS_ctx.$t('places_view.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-lg text-gray-600 dark:text-gray-300 text-center mb-8") },
    });
    (__VLS_ctx.$t('places_view.subtitle'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6") },
    });
    for (const [place] of __VLS_getVForSourceType((__VLS_ctx.places))) {
        const __VLS_13 = {}.PlaceCard;
        /** @type { [typeof __VLS_components.PlaceCard, ] } */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            key: ((place.uuid)),
            place: ((place)),
        }));
        const __VLS_15 = __VLS_14({
            key: ((place.uuid)),
            place: ((place)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12', 'text-3xl', 'font-bold', 'text-center', 'mb-8', 'text-lg', 'text-gray-600', 'dark:text-gray-300', 'text-center', 'mb-8', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-6',];
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
//# sourceMappingURL=PlacesView.vue.js.map