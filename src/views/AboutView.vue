<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-3xl font-bold text-center mb-8">
        {{ $t('about_view.title') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 text-center">
        {{ $t('about_view.subtitle') }}
      </p>
      <!-- Основной контент с анимацией -->
      <div class="mt-8 max-w-2xl mx-auto space-y-6">
        <!-- Новые колонки с преимуществами -->
        <div class="grid md:grid-cols-2 gap-6 animate-columns-appear">
          <!-- Для гиков -->
          <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-[1.02]">
            <h2 class="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              {{ $t('about_view.for_geeks.title') }}
            </h2>
            <ul class="space-y-3">
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">🎮</span>
                <span>{{ $t('about_view.for_geeks.items.find_places') }}</span>
              </li>
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">🤝</span>
                <span>{{ $t('about_view.for_geeks.items.connect') }}</span>
              </li>
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">🗺️</span>
                <span>{{ $t('about_view.for_geeks.items.interactive_map') }}</span>
              </li>
            </ul>
          </div>

          <!-- Для владельцев -->
          <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg transition-transform hover:scale-[1.02]">
            <h2 class="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
              {{ $t('about_view.for_owners.title') }}
            </h2>
            <ul class="space-y-3">
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">📢</span>
                <span>{{ $t('about_view.for_owners.items.free_advertising') }}</span>
              </li>
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">📈</span>
                <span>{{ $t('about_view.for_owners.items.analytics') }}</span>
              </li>
              <li class="flex items-start text-gray-600 dark:text-gray-300">
                <span class="mr-2 mt-1">💡</span>
                <span>{{ $t('about_view.for_owners.items.feedback') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Остальные существующие блоки -->
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg animate-fade-in-up delay-300">
          <p class="text-gray-600 dark:text-gray-300" v-html="$t('about_view.description')"></p>
        </div>
      </div>

      <div class="mt-8 max-w-2xl mx-auto space-y-6">
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-blue-400 mb-4">
            {{ $t('about_view.principles.title') }}
          </h2>
          <ul class="list-disc list-inside space-y-2">
            <li class="text-gray-600 dark:text-gray-300">
              {{ $t('about_view.principles.items.free_for_users') }}
            </li>
            <li class="text-gray-600 dark:text-gray-300">
              {{ $t('about_view.principles.items.free_for_places') }}
            </li>
            <li class="text-gray-600 dark:text-gray-300">
              {{ $t('about_view.principles.items.preserve_memory') }}
            </li>
            <li class="text-gray-600 dark:text-gray-300">
              {{ $t('about_view.principles.items.find_like_minded') }}
            </li>
            <li class="text-gray-600 dark:text-gray-300">
              {{ $t('about_view.principles.items.no_sales') }}
            </li>
          </ul>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-blue-400 mb-4">
            {{ $t('about_view.support.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t('about_view.support.text') }}
            <a
                href="https://boosty.to/nickjayrussell"
                target="_blank"
                class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {{ $t('about_view.support.boosty_link') }}
            </a>.
          </p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";

export default defineComponent({
  name: 'AboutView',
  components: { BaseLayout },
  setup() {
    // Устанавливаем мета-теги
    useHead({
      title: 'О проекте GeekPortal',
      meta: [
        {
          name: 'description',
          content: 'Узнайте больше о GeekPortal — каталоге гик-мест для любителей технологий, игр и науки.',
        },
      ],
    });
  },
});
</script>

<style scoped>
/* Анимации */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in;
}

.animate-fade-in-up {
  animation: fade-in 0.6s ease-in, slide-up 0.6s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

.animate-columns-appear {
  animation: columns-appear 0.8s ease-out;
}

@keyframes columns-appear {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-300 {
  animation-delay: 300ms;
}

/* Ховер-эффекты */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.container {
  max-width: 800px;
}
</style>