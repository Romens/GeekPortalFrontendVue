<template>
  <base-layout>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6 dark:text-white">Админ-панель</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Всего профилей</h3>
          <p class="text-3xl dark:text-white">{{ stats.profiles_count }}</p>
        </div>

        <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Активных профилей</h3>
          <p class="text-3xl dark:text-white">{{ stats.profiles_active_count }}</p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mb-8">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">Быстрые действия</h2>
        
        <router-link 
          to="/add-geek-place"
          class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors mb-4"
        >
        <span>📍</span>
          Добавить новое место
        </router-link>

        <div v-if="geekStore.recentPlaces && geekStore.recentPlaces.length > 0" class="space-y-4">
          <h3 class="text-lg font-semibold dark:text-white">Последние места:</h3>
          <div v-if="isLoading" class="text-gray-500 dark:text-gray-400">
            Загрузка...
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="place in geekStore.lastThreePlaces" 
              :key="place.id"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <h4 class="font-medium mb-2 dark:text-white">{{ place.title }}</h4>
              <div class="flex gap-2">
                <router-link 
                  :to="`/place/${place.id}/edit`"
                  class="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  <span class="material-icons text-sm">edit</span>
                  Редактировать
                </router-link>
                <router-link 
                  :to="`/place/${place.id}`"
                  class="inline-flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  <span class="material-icons text-sm">visibility</span>
                  Просмотр
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlacesTable />
    </div>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useGeekStore } from '@/stores/geekStore';
import { storeToRefs } from 'pinia';
import PlacesTable from '@/components/PlacesTable.vue';

interface Stats {
  profiles_count: number;
  profiles_active_count: number;
}

export default defineComponent({
  components: { BaseLayout, PlacesTable },
  setup() {
    const geekStore = useGeekStore();
    const { isLoading } = storeToRefs(geekStore);
    const stats = ref<Stats>({
      profiles_count: 0,
      profiles_active_count: 0
    });

    onMounted(async () => {
      try {
        const [statsResponse] = await Promise.all([
          axios.get('https://api.geekportal.org/stats')
        ]);
        stats.value = statsResponse.data;
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    });

    return {
      stats,
      geekStore,
      isLoading
    };
  },
});
</script>