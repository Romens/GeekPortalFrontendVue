<template>
  <BaseLayout>
    <Jumbotron :transPrefix="'home_view.jumbotron'" />
    <div class="container mx-auto px-4 py-12">
      <div class="flex items-start bg-blue-50 p-4 rounded-lg border border-blue-300 border-l-4 border-l-blue-400">
        <span class="mr-3 text-blue-500">ℹ️</span>
        <div class="text-blue-800">
          <p class="text-sm leading-relaxed">
            {{ $t('home_view.info_message') }}
          </p>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-center mb-8">
        {{ $t('home_view.welcome_title') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 text-center">
        {{ $t('home_view.welcome_subtitle') }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">
            {{ $t('home_view.categories.cafe.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home_view.categories.cafe.description') }}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">
            {{ $t('home_view.categories.shops.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home_view.categories.shops.description') }}
          </p>
        </div>
        <div class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">
            {{ $t('home_view.categories.coworking.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('home_view.categories.coworking.description') }}
          </p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Jumbotron from '@/components/Jumbotron.vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    BaseLayout,
    Jumbotron,
  },
  setup() {
    // Устанавливаем мета-теги
    useHead({
      title: 'GeekPortal',
      meta: [
        {
          name: 'description',
          content: 'GeekPortal — лучший каталог гик-мест в вашем городе. Найдите кафе, магазины и коворкинги для гиков.',
        },
      ],
    });
  },
});
</script>