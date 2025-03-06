import { defineComponent, onMounted, ref, computed } from 'vue';
import L from '@/utils/leafletFix';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useCacheStore } from '@/stores/cacheStore';
import { useGeekStore } from '@/stores/geekStore';
export default defineComponent({
    name: 'MapView',
    components: { BaseLayout },
    setup() {
        const map = ref(null);
        const mapType = ref('osm');
        const places = ref([]);
        const currentCity = ref('');
        const markers = ref([]);
        const cacheStore = useCacheStore();
        const geekStore = useGeekStore();
        const availableCities = computed(() => {
            return cacheStore.cities;
        });
        const mapTypeOptions = computed(() => {
            return cacheStore.webMaps.reduce((acc, map) => {
                acc[map.name] = {
                    url: map.url,
                    attribution: map.attribution,
                };
                return acc;
            }, {});
        });
        onMounted(async () => {
            await cacheStore.fetchCacheData();
            map.value = L.map('map', {
                attributionControl: false,
            }).setView([55.7558, 37.6176], 13);
            setMapType('osm');
            if (availableCities.value.length > 0) {
                await loadPlaces(availableCities.value[0].name);
            }
        });
        const loadPlaces = async (cityName) => {
            try {
                currentCity.value = cityName;
                await geekStore.fetchPlaces({ city: cityName });
                places.value = geekStore.places;
                // Координаты для разных городов
                const cityCoordinates = {
                    'msk': [55.7558, 37.6176],
                    'spb': [59.9343, 30.3351],
                };
                const coordinates = cityCoordinates[cityName] || [55.7558, 37.6176];
                map.value?.setView(coordinates, 13);
                addMarkers();
            }
            catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        const setMapType = (type) => {
            if (!map.value)
                return;
            map.value.eachLayer((layer) => {
                if (!(layer instanceof L.Marker)) {
                    map.value?.removeLayer(layer);
                }
            });
            const { url, attribution } = mapTypeOptions.value[type];
            L.tileLayer(url, { attribution }).addTo(map.value);
            mapType.value = type;
        };
        const addMarkers = () => {
            if (!map.value)
                return;
            markers.value.forEach((marker) => {
                map.value?.removeLayer(marker);
            });
            markers.value = [];
            places.value.forEach((place) => {
                const marker = L.marker([place.latitude, place.longitude]).addTo(map.value);
                const popupContent = `
          <div class="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            ${place.photo_url ? `<img src="${place.photo_url}" alt="${place.title}" class="w-full h-32 object-cover rounded-t-lg">` : ''}
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">${place.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">${place.description}</p>
              ${place.address ? `<p class="text-sm text-gray-500 mt-2">${place.address}</p>` : ''}
            </div>
          </div>
        `;
                marker.bindPopup(popupContent);
                markers.value.push(marker);
            });
        };
        return {
            mapType,
            setMapType,
            currentCity,
            loadPlaces,
            mapTypeOptions,
            availableCities,
        };
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-3xl font-bold text-center mb-8") },
    });
    (__VLS_ctx.$t('map_view.title'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-lg text-gray-600 dark:text-gray-300 text-center mb-8") },
    });
    (__VLS_ctx.$t('map_view.subtitle'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col md:flex-row gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full md:w-1/4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow p-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-xl font-semibold mb-4 dark:text-white") },
    });
    (__VLS_ctx.$t('map_view.cities'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col space-y-2") },
    });
    for (const [city] of __VLS_getVForSourceType((__VLS_ctx.availableCities))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.loadPlaces(city.name);
                } },
            key: ((city.name)),
            ...{ class: (([
                    'px-4 py-2 rounded-lg text-left',
                    __VLS_ctx.currentCity === city.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
                ])) },
        });
        (city.front_name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full md:w-3/4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-end space-x-2") },
    });
    for (const [mapTypeOption, key] of __VLS_getVForSourceType((__VLS_ctx.mapTypeOptions))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.setMapType(key);
                } },
            key: ((key)),
            ...{ class: (([
                    'px-4 py-2 rounded-lg',
                    __VLS_ctx.mapType === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
                ])) },
        });
        (__VLS_ctx.$t(`map_view.map_types.${key}`));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: ("map"),
        ...{ class: ("h-[600px]") },
    });
    __VLS_5.slots.default;
    var __VLS_5;
    ['container', 'mx-auto', 'px-4', 'py-12', 'text-3xl', 'font-bold', 'text-center', 'mb-8', 'text-lg', 'text-gray-600', 'dark:text-gray-300', 'text-center', 'mb-8', 'flex', 'flex-col', 'md:flex-row', 'gap-4', 'w-full', 'md:w-1/4', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow', 'p-4', 'text-xl', 'font-semibold', 'mb-4', 'dark:text-white', 'flex', 'flex-col', 'space-y-2', 'px-4', 'py-2', 'rounded-lg', 'text-left', 'w-full', 'md:w-3/4', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow', 'p-4', 'mb-4', 'flex', 'justify-end', 'space-x-2', 'px-4', 'py-2', 'rounded-lg', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow', 'overflow-hidden', 'h-[600px]',];
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
//# sourceMappingURL=MapView.vue.js.map