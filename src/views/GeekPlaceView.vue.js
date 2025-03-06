import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";
export default defineComponent({
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
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12',];
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
//# sourceMappingURL=GeekPlaceView.vue.js.map