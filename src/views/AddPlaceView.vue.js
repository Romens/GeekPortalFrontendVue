import { defineComponent, reactive, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import BaseLayout from "@/layouts/BaseLayout.vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { useRouter } from "vue-router";
import Echo from 'laravel-echo';
import { useUserStore } from '@/stores/userStore';
export default defineComponent({
    components: { BaseLayout },
    setup() {
        const geekStore = useGeekStore();
        const userStore = useUserStore();
        const router = useRouter();
        const isGeocoding = ref(false);
        const userId = ref(null);
        const form = reactive({
            title: '',
            address: '',
            latitude: null,
            longitude: null,
            description: '',
            url: '',
            work_time: '',
            is_adult: false,
        });
        const errors = ref({});
        const map = ref(null);
        const showMapSection = ref(false);
        const showAdditionalFields = ref(false);
        const marker = ref(null);
        const geocodeAddress = async () => {
            if (!form.address.trim()) {
                alert('Введите адрес для определения координат');
                return;
            }
            try {
                isGeocoding.value = true;
                await axios.get('https://api.geekportal.org/sanctum/csrf-cookie');
                const response = await axios.post('https://api.geekportal.org/geocoder', {
                    address: form.address,
                });
                if (response.status !== 200)
                    throw new Error('Ошибка геокодирования');
                console.log(response);
                const data = response.data;
                if (data.latitude && data.longitude) {
                    form.latitude = data.latitude;
                    form.longitude = data.longitude;
                    // Обновляем карту и маркер
                    if (map.value) {
                        map.value.setView([data.latitude, data.longitude], 15);
                        if (marker.value)
                            map.value.removeLayer(marker.value);
                        marker.value = L.marker([data.latitude, data.longitude]).addTo(map.value);
                        showAdditionalFields.value = true;
                    }
                }
            }
            catch (error) {
                console.error('Ошибка геокодирования:', error);
                alert('Не удалось определить координаты для этого адреса');
            }
            finally {
                isGeocoding.value = false;
            }
        };
        const initMap = async () => {
            await nextTick();
            if (!map.value) {
                const mapContainer = document.getElementById('map');
                if (!mapContainer)
                    return;
                map.value = L.map(mapContainer, {
                    attributionControl: false
                }).setView([55.7558, 37.6176], 13);
                const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map.value);
                map.value.on('click', (e) => {
                    if (marker.value) {
                        map.value?.removeLayer(marker.value);
                    }
                    marker.value = L.marker(e.latlng).addTo(map.value);
                    form.latitude = e.latlng.lat;
                    form.longitude = e.latlng.lng;
                    showAdditionalFields.value = true;
                });
            }
        };
        const handleAddressInput = async () => {
            if (form.address.length > 5) {
                showMapSection.value = true;
                await initMap();
            }
        };
        const submitForm = async () => {
            try {
                const formData = new FormData();
                Object.entries(form).forEach(([key, value]) => {
                    if (value !== null) {
                        formData.append(key, value.toString());
                    }
                });
                const createdPlace = await geekStore.addPlace(formData);
                console.log(createdPlace);
                if (createdPlace && createdPlace.id) {
                    router.push(`/places/${createdPlace.id}/edit`);
                }
                alert('Место успешно создано!');
                // Сброс формы
                Object.assign(form, {
                    title: '',
                    address: '',
                    latitude: null,
                    longitude: null,
                    description: '',
                    url: '',
                    work_time: '',
                    is_adult: false,
                });
                showMapSection.value = false;
                showAdditionalFields.value = false;
                if (map.value) {
                    map.value.remove();
                    map.value = null;
                }
            }
            catch (error) {
                errors.value = error;
            }
        };
        // Добавляем функцию для обработки полученной локации
        const handleReceivedLocation = (userData) => {
            console.log('Получены данные о локации:', userData);
            if (userData.latitude && userData.longitude) {
                form.latitude = userData.latitude;
                form.longitude = userData.longitude;
                if (map.value) {
                    map.value.setView([userData.latitude, userData.longitude], 15);
                    if (marker.value)
                        map.value.removeLayer(marker.value);
                    marker.value = L.marker([userData.latitude, userData.longitude]).addTo(map.value);
                    showAdditionalFields.value = true;
                }
            }
        };
        // Инициализация веб-сокетов
        onMounted(async () => {
            try {
                // Подписываемся на канал
                window.Echo.private(`Geek.private.${userStore.user?.id}`)
                    .listen('locationIsRecived', (e) => {
                    handleReceivedLocation(e.userData);
                });
            }
            catch (error) {
                console.error('Ошибка при инициализации веб-сокетов:', error);
            }
        });
        // Отписываемся при размонтировании компонента
        onUnmounted(() => {
            if (userId.value) {
                Echo.leave(`Geek.private.${userId.value}`);
            }
        });
        return {
            form,
            errors,
            geekStore,
            isGeocoding,
            geocodeAddress,
            showMapSection,
            showAdditionalFields,
            submitForm,
            handleAddressInput
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-6 max-w-4xl mx-auto") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-2xl font-bold mb-6 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.submitForm) },
        ...{ class: ("space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        value: ((__VLS_ctx.form.title)),
        type: ("text"),
        required: (true),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-red-500 text-sm") },
    });
    (__VLS_ctx.errors.title?.[0]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.handleAddressInput) },
        value: ((__VLS_ctx.form.address)),
        type: ("text"),
        required: (true),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-red-500 text-sm") },
    });
    (__VLS_ctx.errors.address?.[0]);
    if (__VLS_ctx.showMapSection) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-between items-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.geocodeAddress) },
            type: ("button"),
            ...{ class: ("bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white") },
            disabled: ((__VLS_ctx.isGeocoding)),
        });
        (__VLS_ctx.isGeocoding ? 'Определение...' : 'Определить координаты');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: ("map"),
            ...{ class: ("h-96 rounded-lg border-2 border-gray-200 dark:border-gray-600") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500 dark:text-gray-400") },
        });
        (__VLS_ctx.form.latitude?.toFixed(4));
        (__VLS_ctx.form.longitude?.toFixed(4));
    }
    if (__VLS_ctx.showAdditionalFields) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: ("block mb-2 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
            value: ((__VLS_ctx.form.description)),
            ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: ("block mb-2 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: ("url"),
            ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        });
        (__VLS_ctx.form.url);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: ("block mb-2 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            value: ((__VLS_ctx.form.work_time)),
            type: ("text"),
            ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center gap-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: ("checkbox"),
            ...{ class: ("w-4 h-4") },
        });
        (__VLS_ctx.form.is_adult);
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            ...{ class: ("dark:text-white") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors") },
        disabled: ((__VLS_ctx.geekStore.isLoading)),
    });
    (__VLS_ctx.geekStore.isLoading ? 'Отправка...' : 'Создать место');
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-6', 'max-w-4xl', 'mx-auto', 'text-2xl', 'font-bold', 'mb-6', 'dark:text-white', 'space-y-6', 'space-y-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'space-y-4', 'flex', 'justify-between', 'items-center', 'text-xl', 'font-semibold', 'dark:text-white', 'bg-gray-200', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:text-white', 'h-96', 'rounded-lg', 'border-2', 'border-gray-200', 'dark:border-gray-600', 'text-sm', 'text-gray-500', 'dark:text-gray-400', 'space-y-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'flex', 'items-center', 'gap-2', 'w-4', 'h-4', 'dark:text-white', 'bg-blue-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'hover:bg-blue-600', 'transition-colors',];
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
//# sourceMappingURL=AddPlaceView.vue.js.map