<template>
  <BaseLayout>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 dark:text-white">Добавить новое место</h1>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Обязательные поля: Название и Адрес -->
        <div class="space-y-4">
          <div>
            <label class="block mb-2 dark:text-white">Название места *</label>
            <input
                v-model="form.title"
                type="text"
                required
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
            <span class="text-red-500 text-sm">{{ errors.title?.[0] }}</span>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Адрес *</label>
            <input
                v-model="form.address"
                type="text"
                required
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                @input="handleAddressInput"
            >
            <span class="text-red-500 text-sm">{{ errors.address?.[0] }}</span>
          </div>
        </div>

        <!-- Блок карты (появляется после заполнения адреса) -->
        <div v-if="showMapSection" class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold dark:text-white">Укажите местоположение на карте</h2>
            <button
                type="button"
                @click="geocodeAddress"
                class="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                :disabled="isGeocoding"
            >
              {{ isGeocoding ? 'Определение...' : 'Определить координаты' }}
            </button>
          </div>
          <div id="map" class="h-96 rounded-lg border-2 border-gray-200 dark:border-gray-600"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Координаты: {{ form.latitude?.toFixed(4) }}, {{ form.longitude?.toFixed(4) }}
          </p>
        </div>

        <!-- Дополнительные поля (появляются после выбора координат) -->
        <div v-if="showAdditionalFields" class="space-y-4">
          <div>
            <label class="block mb-2 dark:text-white">Описание</label>
            <textarea
                v-model="form.description"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Сайт</label>
            <input
                v-model="form.url"
                type="url"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Время работы</label>
            <input
                v-model="form.work_time"
                type="text"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
          </div>

          <div class="flex items-center gap-2">
            <input
                v-model="form.is_adult"
                type="checkbox"
                class="w-4 h-4"
            >
            <label class="dark:text-white">Только для взрослых</label>
          </div>
        </div>

        <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            :disabled="geekStore.isLoading"
        >
          {{ geekStore.isLoading ? 'Отправка...' : 'Создать место' }}
        </button>
      </form>
    </div>
  </BaseLayout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import BaseLayout from "@/layouts/BaseLayout.vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Map, Marker, LeafletMouseEvent } from 'leaflet';
import axios from "axios";
import {useRouter} from "vue-router";
import Echo from 'laravel-echo';
import { useUserStore } from '@/stores/userStore';

interface LocationEvent {
  userData: {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    latitude: number;
    longitude: number;
  };
}

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
      latitude: null as number | null,
      longitude: null as number | null,
      description: '',
      url: '',
      work_time: '',
      is_adult: false,
    });

    const errors = ref<Record<string, string[]>>({});
    const map = ref<Map | any | null>(null);
    const showMapSection = ref(false);
    const showAdditionalFields = ref(false);
    const marker = ref<Marker | null>(null);

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

        if (response.status !== 200) throw new Error('Ошибка геокодирования');

        console.log(response);
        const data = response.data;

        if (data.latitude && data.longitude) {
          form.latitude = data.latitude;
          form.longitude = data.longitude;

          // Обновляем карту и маркер
          if (map.value) {
            map.value.setView([data.latitude, data.longitude], 15);
            if (marker.value) map.value.removeLayer(marker.value);
            marker.value = L.marker([data.latitude, data.longitude]).addTo(map.value);
            showAdditionalFields.value = true;
          }
        }
      } catch (error) {
        console.error('Ошибка геокодирования:', error);
        alert('Не удалось определить координаты для этого адреса');
      } finally {
        isGeocoding.value = false;
      }
    };

    const initMap = async () => {
      await nextTick();

      if (!map.value) {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        map.value = L.map(mapContainer, {
          attributionControl: false
        }).setView([55.7558, 37.6176], 13);

        const tileLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { attribution: '© OpenStreetMap' }
        ).addTo(map.value);

        map.value.on('click', (e: LeafletMouseEvent) => {
          if (marker.value) {
            map.value?.removeLayer(marker.value);
          }
          marker.value = L.marker(e.latlng).addTo(map.value as Map);
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
      } catch (error) {
        errors.value = error as Record<string, string[]>;
      }
    };

    // Добавляем функцию для обработки полученной локации
    const handleReceivedLocation = (userData: any) => {
      console.log('Получены данные о локации:', userData);
      if (userData.latitude && userData.longitude) {
        form.latitude = userData.latitude;
        form.longitude = userData.longitude;

        if (map.value) {
          map.value.setView([userData.latitude, userData.longitude], 15);
          if (marker.value) map.value.removeLayer(marker.value);
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
          .listen('locationIsRecived', (e: LocationEvent) => {
            handleReceivedLocation(e.userData);
          });
      } catch (error) {
        console.error('Ошибка при инициализации веб-сокетов:', error);
      }
    });

    // Отписываемся при размонтировании компонента
    onUnmounted(() => {
      if (userId.value) {
        (Echo as any).leave(`Geek.private.${userId.value}`);
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
</script>