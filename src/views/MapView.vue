<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-center mb-8">
        {{ $t('map_view.title') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
        {{ $t('map_view.subtitle') }}
      </p>

      <div class="flex flex-col md:flex-row gap-4">
        <!-- Фильтр городов (слева) -->
        <div class="w-full md:w-1/4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 class="text-xl font-semibold mb-4 dark:text-white">
              {{ $t('map_view.cities') }}
            </h2>
            <div class="flex flex-col space-y-2">
              <button
                @click="loadPlaces(city.name)"
                v-for="city in availableCities"
                :key="city.name"
                :class="[
                  'px-4 py-2 rounded-lg text-left',
                  currentCity === city.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
                ]"
              >
                {{ city.front_name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Основной контент с картой -->
        <div class="w-full md:w-3/4">
          <!-- Переключатель карт (над картой) -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
            <div class="flex justify-end space-x-2">
              <button
                v-for="(mapTypeOption, key) in mapTypeOptions"
                :key="key"
                @click="setMapType(key)"
                :class="[
                  'px-4 py-2 rounded-lg',
                  mapType === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
                ]"
              >
                {{ $t(`map_view.map_types.${key}`) }}
              </button>
            </div>
          </div>

          <!-- Контейнер для карты -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div id="map" class="h-[600px]"></div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed } from 'vue';
import L from '@/utils/leafletFix';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useCacheStore } from '@/stores/cacheStore';
import { useGeekStore } from '@/stores/geekStore';

export default defineComponent({
  name: 'MapView',
  components: { BaseLayout },
  setup() {
    const map = ref<L.Map | null>(null) as Ref<L.Map | null>;
    const mapType = ref<string>('osm');
    const places = ref<any[]>([]);
    const currentCity = ref<string>('');
    const markers = ref<L.Marker[]>([]);
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
      }, {} as Record<string, { url: string; attribution: string }>);
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

    const loadPlaces = async (cityName: string) => {
      try {
        currentCity.value = cityName;
        await geekStore.fetchPlaces({ city: cityName });
        places.value = geekStore.places;

        // Координаты для разных городов
        const cityCoordinates: Record<string, [number, number]> = {
          'msk': [55.7558, 37.6176],
          'spb': [59.9343, 30.3351],
        };

        const coordinates = cityCoordinates[cityName] || [55.7558, 37.6176];
        map.value?.setView(coordinates, 13);

        addMarkers();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const setMapType = (type: string) => {
      if (!map.value) return;

      map.value.eachLayer((layer) => {
        if (!(layer instanceof L.Marker)) {
          map.value?.removeLayer(layer);
        }
      });

      const { url, attribution } = mapTypeOptions.value[type];
      L.tileLayer(url, { attribution }).addTo(map.value as L.Map);

      mapType.value = type;
    };

    const addMarkers = () => {
      if (!map.value) return;

      markers.value.forEach((marker: any) => {
        map.value?.removeLayer(marker);
      });
      markers.value = [];

      places.value.forEach((place) => {
        const marker = L.marker([place.latitude, place.longitude]).addTo(map.value as L.Map);

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
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>