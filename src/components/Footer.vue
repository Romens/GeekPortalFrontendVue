<template>
  <footer class="bg-gray-800 text-white py-6 mt-12">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm">
        Разработано без ❤️
        <a
            href="https://t.me/nickrussell"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 underline"
        >
          Nick Jay Russell
        </a>
      </p>
      <p class="text-sm mt-2">
        Подписывайтесь на канал
        <a
            href="https://t.me/cat_sunny"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 underline"
        >
          прекрасной кошечки</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>