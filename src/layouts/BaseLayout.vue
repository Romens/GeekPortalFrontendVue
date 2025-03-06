<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <NavBar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/Navbar.vue';

export default defineComponent({
  components: {
    NavBar,
  }
});
</script>

<style scoped>
</style>