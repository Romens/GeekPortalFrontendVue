import { defineComponent, ref, onUnmounted } from 'vue';
export default defineComponent({
    name: 'PlaceCard',
    props: {
        place: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const scrollPosition = ref(0);
        let scrollInterval = null;
        const startScroll = () => {
            if (scrollInterval)
                return; // Если интервал уже запущен, ничего не делаем
            scrollInterval = setInterval(() => {
                scrollPosition.value -= 100; // Сдвигаем на 100% ширины контейнера
                if (scrollPosition.value <= -100 * (props.place.images.length - 1)) {
                    scrollPosition.value = 0; // Возвращаемся к первому изображению
                }
            }, 3000); // Интервал смены изображений (3 секунды)
        };
        const stopScroll = () => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
            scrollPosition.value = 0; // Сбрасываем позицию прокрутки
        };
        onUnmounted(() => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
            }
        });
        return {
            scrollPosition,
            startScroll,
            stopScroll,
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['place-card',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("place-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative h-48 overflow-hidden") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ((__VLS_ctx.place.image)),
        alt: ((__VLS_ctx.place.name)),
        ...{ class: ("w-full h-full object-cover") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMouseover: (__VLS_ctx.startScroll) },
        ...{ onMouseleave: (__VLS_ctx.stopScroll) },
        ...{ class: ("absolute inset-0 flex overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex") },
        ...{ style: (({ transform: `translateX(${__VLS_ctx.scrollPosition}%)` })) },
    });
    for (const [img, index] of __VLS_getVForSourceType((__VLS_ctx.place.images))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            key: ((index)),
            src: ((img)),
            alt: ((`${__VLS_ctx.place.name} image ${index + 1}`)),
            ...{ class: ("w-full h-full object-cover flex-shrink-0") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-4") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ((`/places/${__VLS_ctx.place.uuid}`)),
        ...{ class: ("text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-300") },
    }));
    const __VLS_2 = __VLS_1({
        to: ((`/places/${__VLS_ctx.place.uuid}`)),
        ...{ class: ("text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-300") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    (__VLS_ctx.place.name);
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("mt-2 text-gray-600 dark:text-gray-300") },
    });
    (__VLS_ctx.place.description);
    ['place-card', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'hover:shadow-xl', 'transition-shadow', 'duration-300', 'relative', 'h-48', 'overflow-hidden', 'w-full', 'h-full', 'object-cover', 'absolute', 'inset-0', 'flex', 'overflow-hidden', 'opacity-0', 'hover:opacity-100', 'transition-opacity', 'duration-500', 'flex', 'w-full', 'h-full', 'object-cover', 'flex-shrink-0', 'p-4', 'text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'hover:text-blue-600', 'transition-colors', 'duration-300', 'mt-2', 'text-gray-600', 'dark:text-gray-300',];
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
//# sourceMappingURL=PlaceCard.vue.js.map