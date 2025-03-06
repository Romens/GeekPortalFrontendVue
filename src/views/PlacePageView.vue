<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-12">
      <div v-if="place" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Основной контент -->
        <div class="lg:col-span-3">
          <!-- Название гик-места -->
          <h1 class="text-4xl font-bold break-words text-center mb-8">{{ place.name }}</h1>

          <!-- Пользовательские кнопки -->
          <div class="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <!-- Кнопка "Сколько лайкнули?" -->
            <button
                @click="handleLike"
                class="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors w-full md:w-auto"
                :class="{ 'bg-blue-200': isLiked }"
            >
              <span class="text-xl">👍</span>
              <span class="text-sm">
              {{ isLiked ? $t('place_page_view.like_button.liked', { count: likeCount }) : $t('place_page_view.like_button.default', { count: likeCount }) }}
            </span>
            </button>

            <!-- Кнопка "Обязательно посетят!" -->
            <button
                @click="handleVisit"
                class="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors w-full md:w-auto"
                :class="{ 'bg-green-200': isVisiting }"
            >
              <span class="text-xl">📍</span>
              <span class="text-sm">
              {{ isVisiting ? $t('place_page_view.visit_button.visiting', { count: visitCount }) : $t('place_page_view.visit_button.default', { count: visitCount }) }}
            </span>
            </button>
          </div>

          <!-- Галерея изображений -->
          <div class="relative mb-8">
            <!-- Основное изображение -->
            <div class="relative h-96 overflow-hidden rounded-lg shadow-lg">
              <img
                  :src="currentImage"
                  :alt="place.name"
                  class="w-full h-full object-cover transition-opacity duration-300"
                  :class="{ 'opacity-0': imageLoading }"
                  @load="imageLoading = false"
              >

              <!-- Кнопки навигации -->
              <div v-if="place.images.length > 1" class="absolute inset-0 p-4">
                <!-- Стрелка влево -->
                <button
                    v-if="currentIndex > 0"
                    @click="prevImage"
                    class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow-md transition-colors"
                >
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>

                <!-- Стрелка вправо -->
                <button
                    v-if="currentIndex < place.images.length - 1"
                    @click="nextImage"
                    class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow-md transition-colors"
                >
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <!-- Индикаторы -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                <div
                    v-for="(img, index) in place.images"
                    :key="index"
                    @click="setImage(index)"
                    class="w-3 h-3 rounded-full cursor-pointer transition-colors"
                    :class="currentIndex === index ? 'bg-blue-600' : 'bg-white/80 hover:bg-white'"
                ></div>
              </div>
            </div>
          </div>

          <!-- Описание -->
          <div class="prose max-w-none mb-8" v-html="place.text"></div>

          <!-- Карта -->
          <div id="place-map" class="h-96 rounded-lg shadow-lg"></div>
        </div>

        <!-- Сайдбар -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg sticky top-4">
            <!-- Контакты -->
            <div v-for="(contact, index) in place.contacts" :key="index" class="mb-6">
              <h3 class="text-lg font-semibold mb-2 dark:text-white">
                {{ $t('place_page_view.contacts.title', { index: place.contacts.length > 1 ? index + 1 : '' }) }}
              </h3>
              <ul class="space-y-2">
                <li v-if="contact.email">
                  <a :href="'mailto:' + contact.email" class="text-blue-600 hover:underline dark:text-blue-400">
                    {{ contact.email }}
                  </a>
                </li>
                <li v-if="contact.site">
                  <a :href="contact.site" target="_blank" class="text-blue-600 hover:underline dark:text-blue-400">
                    {{ contact.site }}
                  </a>
                </li>
                <li v-if="contact.telephone">
                  <a :href="'tel:' + contact.telephone" class="text-blue-600 hover:underline dark:text-blue-400">
                    {{ contact.telephone }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- Город -->
            <div class="border-t pt-4 dark:border-gray-600">
              <h3 class="text-lg font-semibold mb-2 dark:text-white">
                {{ $t('place_page_view.city.title') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">{{ place.city.front_name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        {{ $t('place_page_view.loading') }}
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Place } from '@/interfaces/Place';
import L, { Map, Marker } from 'leaflet';
import BaseLayout from "@/layouts/BaseLayout.vue";

export default defineComponent({
  name: 'PlacePageView',
  components: {BaseLayout},
  setup() {
    const route = useRoute();
    const place = ref<Place | null>(null);
    const map = ref<Map | null>(null);
    const marker = ref<Marker | null>(null);
    const currentIndex = ref(0);
    const imageLoading = ref(true);
    const isLiked = ref(false);
    const likeCount = ref(0);
    const isVisiting = ref(false);
    const visitCount = ref(0);

    const loadLocalStorage = () => {
      const uuid = route.params.uuid as string;

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
      const uuid = route.params.uuid as string;
      isLiked.value = !isLiked.value;
      localStorage[isLiked.value ? 'setItem' : 'removeItem'](`liked_${uuid}`, 'true');
      likeCount.value += isLiked.value ? 1 : -1;
    };

    const handleVisit = () => {
      const uuid = route.params.uuid as string;
      isVisiting.value = !isVisiting.value;
      localStorage[isVisiting.value ? 'setItem' : 'removeItem'](`visited_${uuid}`, 'true');
      visitCount.value += isVisiting.value ? 1 : -1;
    };

    const currentImage = computed(() => {
      return place.value?.images?.[currentIndex.value] || place.value?.image;
    });

    const setImage = (index: number) => {
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

    const initMap = (coords: [number, number]) => {
      if (map.value) map.value.remove();

      map.value = L.map('place-map', { attributionControl: false })
          .setView(coords, 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.value as L.Map);

      marker.value = L.marker(coords)
          .addTo(map.value as L.Map)
          .bindPopup(`<b>${place.value?.name}</b><br>${place.value?.description}`)
          .openPopup();
    };

    onMounted(async () => {
      try {
        const uuid = route.params.uuid;
        const response = await fetch(`/places/${uuid}.json`);
        if (!response.ok) throw new Error('Место не найдено');

        place.value = await response.json();
        currentIndex.value = 0;

        if (place.value?.coordinates) {
          await nextTick();
          initMap(place.value.coordinates);
        }

        loadLocalStorage();
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    });

    onUnmounted(() => {
      if (map.value) map.value.remove();
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
</script>

<style scoped>
.miniature-scroll::-webkit-scrollbar {
  display: none;
}
.miniature-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
}
</style>