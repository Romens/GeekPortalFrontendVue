<template>
  <div class="relative h-[600px] flex items-center justify-center bg-cover bg-center text-gray-900 dark:text-white">
    <!-- Фоновое изображение -->
    <div
        class="absolute inset-0 bg-[url('@/assets/simple-bg.jpg')] bg-cover bg-center brightness-50 dark:brightness-75"
    ></div>

    <!-- Контент -->
    <div class="relative z-10 text-center max-w-4xl px-4">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
        {{ $t(`${transPrefix}.title`) }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 animate-fade-in delay-100">
        {{ $t(`${transPrefix}.subtitle`) }}
      </p>
      <div class="space-x-4 animate-fade-in delay-200">
        <router-link
            to="/places"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          {{ $t(`${transPrefix}.search_button`) }}
        </router-link>
        <router-link
            to="/about"
            class="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300  dark:hover:bg-gray-900 dark:hover:text-white"
        >
          {{ $t(`${transPrefix}.learn_more_button`) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Jumbotron',
  props: {
    transPrefix: {
      type: String,
      required: true, // Обязательный пропс
    },
  },
});
</script>

<style scoped>
/* Анимация для плавного появления */
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
.text-5xl {
  color: white !important;
}

.text-xl {
  color: white !important;
}
</style>