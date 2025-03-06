<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
});
</script>

<style>
/* Глобальные стили */
</style>