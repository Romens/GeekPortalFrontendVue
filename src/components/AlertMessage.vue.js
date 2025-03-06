import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        show: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'success',
            validator: (value) => ['success', 'danger'].includes(value)
        }
    }
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    if (__VLS_ctx.show) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: (([
                    'fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 transition-all duration-300',
                    __VLS_ctx.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                ])) },
        });
        (__VLS_ctx.message);
    }
    ['fixed', 'top-4', 'right-4', 'p-4', 'rounded-lg', 'shadow-lg', 'max-w-md', 'z-50', 'transition-all', 'duration-300',];
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
//# sourceMappingURL=AlertMessage.vue.js.map