<template>
  <div class="place-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <!-- Основное изображение -->
    <div class="relative h-48 overflow-hidden">
      <img
          :src="place.image"
          :alt="place.name"
          class="w-full h-full object-cover"
      />
      <!-- Галерея изображений -->
      <div
          class="absolute inset-0 flex overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-500"
          @mouseover="startScroll"
          @mouseleave="stopScroll"
      >
        <div
            class="flex"
            :style="{ transform: `translateX(${scrollPosition}%)` }"
        >
          <img
              v-for="(img, index) in place.images"
              :key="index"
              :src="img"
              :alt="`${place.name} image ${index + 1}`"
              class="w-full h-full object-cover flex-shrink-0"
          />
        </div>
      </div>
    </div>

    <!-- Название и описание -->
    <div class="p-4">
      <router-link
          :to="`/places/${place.uuid}`"
          class="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-300"
      >
        {{ place.name }}
      </router-link>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        {{ place.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';
import { Place } from '@/interfaces/Place'; // Импорт интерфейса

export default defineComponent({
  name: 'PlaceCard',
  props: {
    place: {
      type: Object as () => Place,
      required: true,
    },
  },
  setup(props) { // Передаем props в setup
    const scrollPosition = ref(0);
    let scrollInterval: ReturnType<typeof setInterval> | null = null;

    const startScroll = () => {
      if (scrollInterval) return; // Если интервал уже запущен, ничего не делаем

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
</script>


<style scoped>
.place-card .flex {
  transition: transform 1s ease-in-out;
  width: 100%;
}

.place-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>