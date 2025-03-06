<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-2">
    <!-- Кнопка добавления нового места -->
    <router-link 
      to="/add-geek-place"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
    >
      <span>📍</span>
      Добавить место
    </router-link>

    <!-- Последние места -->
    <div v-if="geekStore.recentPlaces && geekStore.recentPlaces.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-2">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Последние места:</h3>
      <div v-if="isLoading" class="text-sm text-gray-500">
        Загрузка...
      </div>
      <template v-else>
        <router-link 
          v-for="place in geekStore.lastThreePlaces" 
          :key="place.id"
          :to="`/place/${place.id}/edit`"
          class="block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors"
        >
          {{ place.title }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'QuickLinks',
  setup() {
    const geekStore = useGeekStore();
    const { isLoading } = storeToRefs(geekStore);

    onMounted(async () => {
      try {
        await geekStore.fetchRecentPlaces();
      } catch (error) {
        console.error('Ошибка при загрузке последних мест:', error);
      }
    });

    return {
      geekStore,
      isLoading
    };
  }
});
</script> 