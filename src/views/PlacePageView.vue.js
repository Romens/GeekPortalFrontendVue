import { defineComponent, ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import L from 'leaflet';
import BaseLayout from "@/layouts/BaseLayout.vue";
export default defineComponent({
    name: 'PlacePageView',
    components: { BaseLayout },
    setup() {
        const route = useRoute();
        const place = ref(null);
        const map = ref(null);
        const marker = ref(null);
        const currentIndex = ref(0);
        const imageLoading = ref(true);
        const isLiked = ref(false);
        const likeCount = ref(0);
        const isVisiting = ref(false);
        const visitCount = ref(0);
        const loadLocalStorage = () => {
            const uuid = route.params.uuid;
            if (localStorage.getItem(`liked_${uuid}`)) {
                isLiked.value = true;
                likeCount.value += 1;
            }
            if (localStorage.getItem(`visited_${uuid}`)) {
                isVisiting.value = true;
                visitCount.value += 1;
            }
        };
        const handleLike = () => {
            const uuid = route.params.uuid;
            isLiked.value = !isLiked.value;
            localStorage[isLiked.value ? 'setItem' : 'removeItem'](`liked_${uuid}`, 'true');
            likeCount.value += isLiked.value ? 1 : -1;
        };
        const handleVisit = () => {
            const uuid = route.params.uuid;
            isVisiting.value = !isVisiting.value;
            localStorage[isVisiting.value ? 'setItem' : 'removeItem'](`visited_${uuid}`, 'true');
            visitCount.value += isVisiting.value ? 1 : -1;
        };
        const currentImage = computed(() => {
            return place.value?.images?.[currentIndex.value] || place.value?.image;
        });
        const setImage = (index) => {
            currentIndex.value = index;
            imageLoading.value = true;
        };
        const nextImage = () => {
            if (place.value?.images && currentIndex.value < place.value.images.length - 1) {
                currentIndex.value++;
                imageLoading.value = true;
            }
        };
        const prevImage = () => {
            if (currentIndex.value > 0) {
                currentIndex.value--;
                imageLoading.value = true;
            }
        };
        const initMap = (coords) => {
            if (map.value)
                map.value.remove();
            map.value = L.map('place-map', { attributionControl: false })
                .setView(coords, 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map.value);
            marker.value = L.marker(coords)
                .addTo(map.value)
                .bindPopup(`<b>${place.value?.name}</b><br>${place.value?.description}`)
                .openPopup();
        };
        onMounted(async () => {
            try {
                const uuid = route.params.uuid;
                const response = await fetch(`/places/${uuid}.json`);
                if (!response.ok)
                    throw new Error('Место не найдено');
                place.value = await response.json();
                currentIndex.value = 0;
                if (place.value?.coordinates) {
                    await nextTick();
                    initMap(place.value.coordinates);
                }
                loadLocalStorage();
            }
            catch (error) {
                console.error('Ошибка загрузки:', error);
            }
        });
        onUnmounted(() => {
            if (map.value)
                map.value.remove();
        });
        return {
            place,
            currentImage,
            currentIndex,
            imageLoading,
            isLiked,
            likeCount,
            isVisiting,
            visitCount,
            handleLike,
            handleVisit,
            setImage,
            nextImage,
            prevImage
        };
    },
    metaInfo: {
        title: 'Гик-места | GeekPortal',
        meta: [{
                name: 'description',
                content: 'Исследуйте лучшие гик-места в вашем городе с GeekPortal.'
            }]
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout };
    let __VLS_components;
    let __VLS_directives;
    ['miniature-scroll',];
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
    if (__VLS_ctx.place) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-1 lg:grid-cols-4 gap-8") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("lg:col-span-3") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
            ...{ class: ("text-4xl font-bold break-words text-center mb-8") },
        });
        (__VLS_ctx.place.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col md:flex-row justify-center items-center gap-4 mb-8") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleLike) },
            ...{ class: ("flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors w-full md:w-auto") },
            ...{ class: (({ 'bg-blue-200': __VLS_ctx.isLiked })) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-xl") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm") },
        });
        (__VLS_ctx.isLiked ? __VLS_ctx.$t('place_page_view.like_button.liked', { count: __VLS_ctx.likeCount }) : __VLS_ctx.$t('place_page_view.like_button.default', { count: __VLS_ctx.likeCount }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleVisit) },
            ...{ class: ("flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors w-full md:w-auto") },
            ...{ class: (({ 'bg-green-200': __VLS_ctx.isVisiting })) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-xl") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm") },
        });
        (__VLS_ctx.isVisiting ? __VLS_ctx.$t('place_page_view.visit_button.visiting', { count: __VLS_ctx.visitCount }) : __VLS_ctx.$t('place_page_view.visit_button.default', { count: __VLS_ctx.visitCount }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative mb-8") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative h-96 overflow-hidden rounded-lg shadow-lg") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            ...{ onLoad: (...[$event]) => {
                    if (!((__VLS_ctx.place)))
                        return;
                    __VLS_ctx.imageLoading = false;
                } },
            src: ((__VLS_ctx.currentImage)),
            alt: ((__VLS_ctx.place.name)),
            ...{ class: ("w-full h-full object-cover transition-opacity duration-300") },
            ...{ class: (({ 'opacity-0': __VLS_ctx.imageLoading })) },
        });
        if (__VLS_ctx.place.images.length > 1) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute inset-0 p-4") },
            });
            if (__VLS_ctx.currentIndex > 0) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (__VLS_ctx.prevImage) },
                    ...{ class: ("absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow-md transition-colors") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                    ...{ class: ("w-8 h-8") },
                    fill: ("none"),
                    stroke: ("currentColor"),
                    viewBox: ("0 0 24 24"),
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                    'stroke-linecap': ("round"),
                    'stroke-linejoin': ("round"),
                    'stroke-width': ("2"),
                    d: ("M15 19l-7-7 7-7"),
                });
            }
            if (__VLS_ctx.currentIndex < __VLS_ctx.place.images.length - 1) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (__VLS_ctx.nextImage) },
                    ...{ class: ("absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow-md transition-colors") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                    ...{ class: ("w-8 h-8") },
                    fill: ("none"),
                    stroke: ("currentColor"),
                    viewBox: ("0 0 24 24"),
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                    'stroke-linecap': ("round"),
                    'stroke-linejoin': ("round"),
                    'stroke-width': ("2"),
                    d: ("M9 5l7 7-7 7"),
                });
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute bottom-4 left-0 right-0 flex justify-center space-x-2") },
        });
        for (const [img, index] of __VLS_getVForSourceType((__VLS_ctx.place.images))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.place)))
                            return;
                        __VLS_ctx.setImage(index);
                    } },
                key: ((index)),
                ...{ class: ("w-3 h-3 rounded-full cursor-pointer transition-colors") },
                ...{ class: ((__VLS_ctx.currentIndex === index ? 'bg-blue-600' : 'bg-white/80 hover:bg-white')) },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("prose max-w-none mb-8") },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.place.text) }, null, null);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: ("place-map"),
            ...{ class: ("h-96 rounded-lg shadow-lg") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("lg:col-span-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg sticky top-4") },
        });
        for (const [contact, index] of __VLS_getVForSourceType((__VLS_ctx.place.contacts))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: ((index)),
                ...{ class: ("mb-6") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: ("text-lg font-semibold mb-2 dark:text-white") },
            });
            (__VLS_ctx.$t('place_page_view.contacts.title', { index: __VLS_ctx.place.contacts.length > 1 ? index + 1 : '' }));
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
                ...{ class: ("space-y-2") },
            });
            if (contact.email) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    href: (('mailto:' + contact.email)),
                    ...{ class: ("text-blue-600 hover:underline dark:text-blue-400") },
                });
                (contact.email);
            }
            if (contact.site) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    href: ((contact.site)),
                    target: ("_blank"),
                    ...{ class: ("text-blue-600 hover:underline dark:text-blue-400") },
                });
                (contact.site);
            }
            if (contact.telephone) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    href: (('tel:' + contact.telephone)),
                    ...{ class: ("text-blue-600 hover:underline dark:text-blue-400") },
                });
                (contact.telephone);
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("border-t pt-4 dark:border-gray-600") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-lg font-semibold mb-2 dark:text-white") },
        });
        (__VLS_ctx.$t('place_page_view.city.title'));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 dark:text-gray-300") },
        });
        (__VLS_ctx.place.city.front_name);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-center py-12") },
        });
        (__VLS_ctx.$t('place_page_view.loading'));
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12', 'grid', 'grid-cols-1', 'lg:grid-cols-4', 'gap-8', 'lg:col-span-3', 'text-4xl', 'font-bold', 'break-words', 'text-center', 'mb-8', 'flex', 'flex-col', 'md:flex-row', 'justify-center', 'items-center', 'gap-4', 'mb-8', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-blue-100', 'hover:bg-blue-200', 'rounded-lg', 'transition-colors', 'w-full', 'md:w-auto', 'bg-blue-200', 'text-xl', 'text-sm', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-green-100', 'hover:bg-green-200', 'rounded-lg', 'transition-colors', 'w-full', 'md:w-auto', 'bg-green-200', 'text-xl', 'text-sm', 'relative', 'mb-8', 'relative', 'h-96', 'overflow-hidden', 'rounded-lg', 'shadow-lg', 'w-full', 'h-full', 'object-cover', 'transition-opacity', 'duration-300', 'opacity-0', 'absolute', 'inset-0', 'p-4', 'absolute', 'left-4', 'top-1/2', '-translate-y-1/2', 'p-2', 'rounded-full', 'bg-white/80', 'hover:bg-white/100', 'shadow-md', 'transition-colors', 'w-8', 'h-8', 'absolute', 'right-4', 'top-1/2', '-translate-y-1/2', 'p-2', 'rounded-full', 'bg-white/80', 'hover:bg-white/100', 'shadow-md', 'transition-colors', 'w-8', 'h-8', 'absolute', 'bottom-4', 'left-0', 'right-0', 'flex', 'justify-center', 'space-x-2', 'w-3', 'h-3', 'rounded-full', 'cursor-pointer', 'transition-colors', 'prose', 'max-w-none', 'mb-8', 'h-96', 'rounded-lg', 'shadow-lg', 'lg:col-span-1', 'bg-white', 'dark:bg-gray-700', 'p-6', 'rounded-lg', 'shadow-lg', 'sticky', 'top-4', 'mb-6', 'text-lg', 'font-semibold', 'mb-2', 'dark:text-white', 'space-y-2', 'text-blue-600', 'hover:underline', 'dark:text-blue-400', 'text-blue-600', 'hover:underline', 'dark:text-blue-400', 'text-blue-600', 'hover:underline', 'dark:text-blue-400', 'border-t', 'pt-4', 'dark:border-gray-600', 'text-lg', 'font-semibold', 'mb-2', 'dark:text-white', 'text-gray-600', 'dark:text-gray-300', 'text-center', 'py-12',];
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
//# sourceMappingURL=PlacePageView.vue.js.map