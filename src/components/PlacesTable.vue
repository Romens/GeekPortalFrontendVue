<template>
  <div class="p-4">
    <div class="filters mb-4 flex flex-col md:flex-row gap-4">
      <input v-model="filters.search" placeholder="Поиск по названию" class="p-2 border rounded dark:bg-gray-700 dark:text-white" />
      <select v-model="filters.city" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Все города</option>
        <option v-for="city in cacheStore.cities" :key="city.uuid" :value="city.name">
          {{ city.front_name }}
        </option>
      </select>
      <select v-model="filters.category" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Все категории</option>
        <option v-for="category in cacheStore.categories" :key="category.id" :value="category.url">
          {{ category.front_name }}
        </option>
      </select>
      <select v-model="filters.is_adult" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option :value="null">Все</option>
        <option :value="true">Только для взрослых</option>
        <option :value="false">Для всех</option>
      </select>
      <button @click="applyFilters" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">Применить фильтры</button>
    </div>

    <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Название</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Город</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Категория</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Активный</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Для взрослых</th>
          <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="place in geekStore.places" :key="place.id" class="border-b border-gray-200 dark:border-gray-700">
          <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{{ place.title }}</td>
          <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{{ cacheStore.cities.find(city => city.name === place.city_name)?.front_name || place.city_name }}</td>
          <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">{{ cacheStore.categories.find(category => category.url === place.category_url)?.front_name || place.category_url }}</td>
          <td class="py-2 px-4 text-sm">
            <span :class="place.is_active ? 'text-green-500' : 'text-red-500'">
              {{ place.is_active ? '✅' : '❌' }}
            </span>
          </td>
          <td class="py-2 px-4 text-sm">
            <span :class="place.is_adult ? 'text-green-500' : 'text-red-500'">
              {{ place.is_adult ? '✅' : '❌' }}
            </span>
          </td>
          <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200">
            <router-link :to="`/place/${place.id}/edit`" class="text-blue-500 hover:text-blue-700">
              ✏️ Редактировать
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination mt-4 flex justify-between items-center" v-if="geekStore.pagination">
      <button @click="changePage(geekStore.pagination.current_page - 1)" :disabled="geekStore.pagination.current_page === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded transition-colors disabled:opacity-50">Назад</button>
      <span class="text-sm text-gray-700 dark:text-gray-300">Страница {{ geekStore.pagination.current_page }} из {{ geekStore.pagination.last_page }}</span>
      <button @click="changePage(geekStore.pagination.current_page + 1)" :disabled="geekStore.pagination.current_page === geekStore.pagination.last_page" class="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded transition-colors disabled:opacity-50">Вперед</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useGeekStore } from '@/stores/geekStore';
import { useCacheStore } from '@/stores/cacheStore';

export default defineComponent({
  setup() {
    const geekStore = useGeekStore();
    const cacheStore = useCacheStore();
    
    const filters = reactive({
      search: '',
      city: '',
      category: '',
      is_adult: undefined as boolean | undefined,
    });

    onMounted(async () => {
      await cacheStore.fetchCacheData();
    });

    const applyFilters = () => {
      geekStore.fetchPlaces(filters);
    };

    const changePage = (page: number) => {
      geekStore.fetchPlaces({ ...filters, page });
    };

    return {
      geekStore,
      cacheStore,
      filters,
      applyFilters,
      changePage,
    };
  },
});
</script> 