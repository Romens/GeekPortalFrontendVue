<template>
  <BaseLayout>
    <AlertMessage
      :show="alert.show"
      :message="alert.message"
      :type="alert.type"
    />
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 dark:text-white">Редактировать место</h1>

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

        <!-- Блок карты -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold dark:text-white">Местоположение на карте</h2>
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
          <button
            v-if="coordinatesClicked"
            type="button"
            @click="fixCoordinates"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Зафиксировать координаты
          </button>
        </div>

        <!-- Превью изображений -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Превью логотипа -->
          <div v-if="form.logo_url" class="space-y-2">
            <h2 class="text-xl font-semibold dark:text-white">Превью логотипа</h2>
            <div class="h-[300px] overflow-hidden">
              <img :src="form.logo_url" alt="Превью логотипа" class=" h-[300px] w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600" />
            </div>
          </div>

          <!-- Превью фото -->
          <div v-if="form.photo_url" class="space-y-2">
            <h2 class="text-xl font-semibold dark:text-white">Превью фото</h2>
            <div class="h-[300px] overflow-hidden">
              <img :src="form.photo_url" alt="Превью фото" class=" h-[300px] w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600" />
            </div>
          </div>
        </div>

        <!-- Дополнительные поля -->
        <div class="space-y-4">
          <div>
            <label class="block mb-2 dark:text-white">Описание</label>
            <textarea
                v-model="form.description"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                rows="4"
            ></textarea>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Полный текст</label>
            <textarea
                v-model="form.text"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                rows="6"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 dark:text-white">Логотип</label>
              <input
                  type="file"
                  @change="(e: Event) => handleFileChange(e, 'logo')"
                  accept="image/*"
                  class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              >
            </div>

            <div>
              <label class="block mb-2 dark:text-white">Фото</label>
              <input
                  type="file"
                  @change="(e: Event) => handleFileChange(e, 'photo')"
                  accept="image/*"
                  class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              >
            </div>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Категория *</label>
            <select
                v-model="form.category_url"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
            >
              <option value="">Выберите категорию</option>
              <option v-for="category in cacheStore.categories" :key="category.id" :value="category.url">
                {{ category.front_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Город *</label>
            <select
                v-model="form.city_name"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                required
            >
              <option value="">Выберите город</option>
              <option v-for="city in cacheStore.cities" :key="city.uuid" :value="city.name">
                {{ city.front_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Полный адрес</label>
            <input
                v-model="form.address_full"
                type="text"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Дополнительный текст</label>
            <input
                v-model="form.open_text"
                type="text"
                class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
          </div>

          <div class="flex items-center gap-2">
            <input
                v-model="form.is_active"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <label class="dark:text-white">Активно</label>
          </div>
          
          <div class="flex items-center gap-2">
            <input
                v-model="form.is_adult"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <label class="dark:text-white">Только для взрослых</label>
          </div>
        </div>

        <div class="flex gap-4">
          <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              :disabled="geekStore.isLoading"
          >
            {{ geekStore.isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          <button
              type="button"
              @click="router.back()"
              class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { useCacheStore } from '@/stores/cacheStore';
import BaseLayout from "@/layouts/BaseLayout.vue";
import L, { Map as LMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Marker, LeafletMouseEvent } from 'leaflet';
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import AlertMessage from '@/components/AlertMessage.vue';

interface PlaceForm {
  title: string;
  description: string;
  text: string;
  logo: File | null;
  photo: File | null;
  logo_url: string | null;
  photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
  url: string | null;
  category_url: string | null;
  city_name: string;
  is_adult: boolean;
  open_text: string | null;
  work_time: string | null;
  address: string;
  address_full: string;
  is_active: boolean;
}

interface Alert {
  show: boolean;
  message: string;
  type: 'success' | 'danger';
}

export default defineComponent({
  components: { BaseLayout, AlertMessage },
  setup() {
    const geekStore = useGeekStore();
    const cacheStore = useCacheStore();
    const router = useRouter();
    const route = useRoute();
    const isGeocoding = ref(false);
    const coordinatesClicked = ref(false);
    
    const form = reactive<PlaceForm>({
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

    const errors = ref<Record<string, string[]>>({});
    const map = ref<LMap | null>(null);
    const marker = ref<L.Marker | null>(null);

    const alert = reactive<Alert>({
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
        const place = await geekStore.getPlace(placeId as string);
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
            marker.value?.addTo(map.value as LMap);
          }
        }
      } catch (error) {
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

        if (response.status !== 200) throw new Error('Ошибка геокодирования');

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
              marker.value.addTo(map.value as LMap);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка геокодирования:', error);
        showAlert('Не удалось определить координаты для этого адреса', 'danger');
      } finally {
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
      const tileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '© OpenStreetMap' }
      );
      
      if (map.value) {
        tileLayer.addTo(map.value as L.Map);
      }

      map.value.on('click', (e: L.LeafletMouseEvent) => {
        console.log('Клик по карте:', e.latlng);
        if (marker.value) {
          marker.value.remove();
        }
        marker.value = L.marker(e.latlng);
        if (map.value) {
          marker.value.addTo(map.value as L.Map);
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

    const handleFileChange = (event: Event, field: keyof Pick<PlaceForm, 'logo' | 'photo'>) => {
      const input = event.target as HTMLInputElement;
      if (input && input.files && input.files.length > 0) {
        form[field] = input.files[0];
      }
    };

    const showAlert = (message: string, type: 'success' | 'danger') => {
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
            } else if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
          }
        });

        const placeId = route.params.id;
        console.log('Обновление места с ID:', placeId);
        await geekStore.updatePlace(placeId as string, formData);
        console.log('Место успешно обновлено');
        showAlert('Место успешно обновлено', 'success');
      } catch (error) {
        console.error('Ошибка обновления места:', error);
        errors.value = error as Record<string, string[]>;
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
</script>