import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { useCacheStore } from '@/stores/cacheStore';
import BaseLayout from "@/layouts/BaseLayout.vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import AlertMessage from '@/components/AlertMessage.vue';
export default defineComponent({
    components: { BaseLayout, AlertMessage },
    setup() {
        const geekStore = useGeekStore();
        const cacheStore = useCacheStore();
        const router = useRouter();
        const route = useRoute();
        const isGeocoding = ref(false);
        const coordinatesClicked = ref(false);
        const form = reactive({
            title: '',
            description: '',
            text: '',
            logo: null,
            photo: null,
            logo_url: null,
            photo_url: null,
            latitude: null,
            longitude: null,
            url: null,
            category_url: null,
            city_name: '',
            is_adult: false,
            open_text: null,
            work_time: null,
            address: '',
            address_full: '',
            is_active: false
        });
        const errors = ref({});
        const map = ref(null);
        const marker = ref(null);
        const alert = reactive({
            show: false,
            message: '',
            type: 'success'
        });
        onMounted(async () => {
            console.log('Инициализация компонента редактирования места');
            await cacheStore.fetchCacheData();
            const placeId = route.params.id;
            try {
                console.log('Загрузка данных места с ID:', placeId);
                const place = await geekStore.getPlace(placeId);
                if (place) {
                    console.log('Данные места успешно получены:', place);
                    Object.assign(form, {
                        title: place.title,
                        description: place.description,
                        text: place.text || '',
                        logo: null, // Файлы нужно обрабатывать отдельно
                        photo: null, // Файлы нужно обрабатывать отдельно
                        logo_url: place.logo_url,
                        photo_url: place.photo_url,
                        latitude: place.latitude,
                        longitude: place.longitude,
                        url: place.url,
                        category_url: place.category_url,
                        city_name: place.city_name,
                        is_adult: place.is_adult,
                        open_text: place.open_text,
                        work_time: place.work_time,
                        address: place.address,
                        address_full: place.address_full,
                        is_active: place.is_active
                    });
                    console.log('Инициализация карты');
                    await initMap();
                    if (form.latitude && form.longitude) {
                        console.log('Установка маркера на карте:', form.latitude, form.longitude);
                        map.value?.setView([form.latitude, form.longitude], 15);
                        marker.value = L.marker([form.latitude, form.longitude]);
                        marker.value?.addTo(map.value);
                    }
                }
            }
            catch (error) {
                console.error('Ошибка загрузки места:', error);
                showAlert('Не удалось загрузить данные места', 'danger');
            }
        });
        const geocodeAddress = async () => {
            if (!form.address.trim()) {
                console.log('Попытка геокодирования с пустым адресом');
                showAlert('Введите адрес для определения координат', 'danger');
                return;
            }
            try {
                console.log('Начало геокодирования адреса:', form.address);
                isGeocoding.value = true;
                await axios.get('https://api.geekportal.org/sanctum/csrf-cookie');
                const response = await axios.post('https://api.geekportal.org/geocoder', {
                    address: form.address,
                });
                if (response.status !== 200)
                    throw new Error('Ошибка геокодирования');
                const data = response.data;
                console.log('Получены координаты:', data);
                if (data.latitude && data.longitude) {
                    form.latitude = data.latitude;
                    form.longitude = data.longitude;
                    if (map.value) {
                        console.log('Обновление позиции на карте');
                        map.value.setView([data.latitude, data.longitude], 15);
                        if (marker.value) {
                            marker.value.remove();
                        }
                        marker.value = L.marker([data.latitude, data.longitude]);
                        if (map.value) {
                            marker.value.addTo(map.value);
                        }
                    }
                }
            }
            catch (error) {
                console.error('Ошибка геокодирования:', error);
                showAlert('Не удалось определить координаты для этого адреса', 'danger');
            }
            finally {
                isGeocoding.value = false;
            }
        };
        const initMap = async () => {
            console.log('Инициализация карты');
            const mapContainer = document.getElementById('map');
            if (!mapContainer) {
                console.error('Контейнер карты не найден');
                return;
            }
            map.value = L.map(mapContainer, {
                attributionControl: false
            }).setView([55.7558, 37.6176], 13);
            console.log('Добавление слоя тайлов');
            const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' });
            if (map.value) {
                tileLayer.addTo(map.value);
            }
            map.value.on('click', (e) => {
                console.log('Клик по карте:', e.latlng);
                if (marker.value) {
                    marker.value.remove();
                }
                marker.value = L.marker(e.latlng);
                if (map.value) {
                    marker.value.addTo(map.value);
                }
                form.latitude = e.latlng.lat;
                form.longitude = e.latlng.lng;
                coordinatesClicked.value = true;
            });
        };
        const handleAddressInput = async () => {
            console.log('Обработка ввода адреса:', form.address);
            if (form.address.length > 5 && !map.value) {
                await initMap();
            }
        };
        const handleFileChange = (event, field) => {
            const input = event.target;
            if (input && input.files && input.files.length > 0) {
                form[field] = input.files[0];
            }
        };
        const showAlert = (message, type) => {
            alert.show = true;
            alert.message = message;
            alert.type = type;
            // Скрыть алерт через 3 секунды
            setTimeout(() => {
                alert.show = false;
            }, 3000);
        };
        const submitForm = async () => {
            console.log('Отправка формы редактирования места');
            try {
                const formData = new FormData();
                Object.entries(form).forEach(([key, value]) => {
                    if (value !== null) {
                        if (typeof value === 'boolean') {
                            formData.append(key, value.toString());
                        }
                        else if (value instanceof File) {
                            formData.append(key, value);
                        }
                        else {
                            formData.append(key, String(value));
                        }
                    }
                });
                const placeId = route.params.id;
                console.log('Обновление места с ID:', placeId);
                await geekStore.updatePlace(placeId, formData);
                console.log('Место успешно обновлено');
                showAlert('Место успешно обновлено', 'success');
            }
            catch (error) {
                console.error('Ошибка обновления места:', error);
                errors.value = error;
                showAlert('Ошибка при обновлении места', 'danger');
            }
        };
        const fixCoordinates = () => {
            coordinatesClicked.value = false;
            showAlert('Координаты зафиксированы', 'success');
        };
        return {
            form,
            errors,
            geekStore,
            cacheStore,
            router,
            isGeocoding,
            coordinatesClicked,
            geocodeAddress,
            submitForm,
            handleAddressInput,
            handleFileChange,
            alert,
            fixCoordinates
        };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { BaseLayout, AlertMessage };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.BaseLayout;
    /** @type { [typeof __VLS_components.BaseLayout, typeof __VLS_components.BaseLayout, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = {}.AlertMessage;
    /** @type { [typeof __VLS_components.AlertMessage, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        show: ((__VLS_ctx.alert.show)),
        message: ((__VLS_ctx.alert.message)),
        type: ((__VLS_ctx.alert.type)),
    }));
    const __VLS_9 = __VLS_8({
        show: ((__VLS_ctx.alert.show)),
        message: ((__VLS_ctx.alert.message)),
        type: ((__VLS_ctx.alert.type)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
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
    if (__VLS_ctx.coordinatesClicked) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.fixCoordinates) },
            type: ("button"),
            ...{ class: ("bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-2 gap-4") },
    });
    if (__VLS_ctx.form.logo_url) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-[300px] overflow-hidden") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.form.logo_url)),
            alt: ("Превью логотипа"),
            ...{ class: (" h-[300px] w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600") },
        });
    }
    if (__VLS_ctx.form.photo_url) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("space-y-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-xl font-semibold dark:text-white") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-[300px] overflow-hidden") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.form.photo_url)),
            alt: ("Превью фото"),
            ...{ class: (" h-[300px] w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600") },
        });
    }
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
        rows: ("4"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
        value: ((__VLS_ctx.form.text)),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        rows: ("6"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: ((e) => __VLS_ctx.handleFileChange(e, 'logo')) },
        type: ("file"),
        accept: ("image/*"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ...{ onChange: ((e) => __VLS_ctx.handleFileChange(e, 'photo')) },
        type: ("file"),
        accept: ("image/*"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.form.category_url)),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        required: (true),
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.form.city_name)),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
        required: (true),
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        value: ((__VLS_ctx.form.address_full)),
        type: ("text"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block mb-2 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        value: ((__VLS_ctx.form.open_text)),
        type: ("text"),
        ...{ class: ("w-full p-2 border rounded dark:bg-gray-700 dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("checkbox"),
        ...{ class: ("w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500") },
    });
    (__VLS_ctx.form.is_active);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("checkbox"),
        ...{ class: ("w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500") },
    });
    (__VLS_ctx.form.is_adult);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("dark:text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors") },
        disabled: ((__VLS_ctx.geekStore.isLoading)),
    });
    (__VLS_ctx.geekStore.isLoading ? 'Сохранение...' : 'Сохранить изменения');
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.router.back();
            } },
        type: ("button"),
        ...{ class: ("bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors") },
    });
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-6', 'max-w-4xl', 'mx-auto', 'text-2xl', 'font-bold', 'mb-6', 'dark:text-white', 'space-y-6', 'space-y-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'text-red-500', 'text-sm', 'space-y-4', 'flex', 'justify-between', 'items-center', 'text-xl', 'font-semibold', 'dark:text-white', 'bg-gray-200', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:text-white', 'h-96', 'rounded-lg', 'border-2', 'border-gray-200', 'dark:border-gray-600', 'text-sm', 'text-gray-500', 'dark:text-gray-400', 'bg-green-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'hover:bg-green-600', 'transition-colors', 'grid', 'grid-cols-2', 'gap-4', 'space-y-2', 'text-xl', 'font-semibold', 'dark:text-white', 'h-[300px]', 'overflow-hidden', 'h-[300px]', 'w-full', 'h-full', 'object-cover', 'rounded-lg', 'border-2', 'border-gray-200', 'dark:border-gray-600', 'space-y-2', 'text-xl', 'font-semibold', 'dark:text-white', 'h-[300px]', 'overflow-hidden', 'h-[300px]', 'w-full', 'h-full', 'object-cover', 'rounded-lg', 'border-2', 'border-gray-200', 'dark:border-gray-600', 'space-y-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'file:mr-4', 'file:py-2', 'file:px-4', 'file:rounded-full', 'file:border-0', 'file:bg-blue-50', 'file:text-blue-700', 'hover:file:bg-blue-100', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'file:mr-4', 'file:py-2', 'file:px-4', 'file:rounded-full', 'file:border-0', 'file:bg-blue-50', 'file:text-blue-700', 'hover:file:bg-blue-100', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'block', 'mb-2', 'dark:text-white', 'w-full', 'p-2', 'border', 'rounded', 'dark:bg-gray-700', 'dark:text-white', 'flex', 'items-center', 'gap-2', 'w-4', 'h-4', 'rounded', 'border-gray-300', 'text-blue-600', 'focus:ring-blue-500', 'dark:text-white', 'flex', 'items-center', 'gap-2', 'w-4', 'h-4', 'rounded', 'border-gray-300', 'text-blue-600', 'focus:ring-blue-500', 'dark:text-white', 'flex', 'gap-4', 'bg-blue-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'hover:bg-blue-600', 'transition-colors', 'bg-gray-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'hover:bg-gray-600', 'transition-colors',];
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
//# sourceMappingURL=EditFormPlace.vue.js.map