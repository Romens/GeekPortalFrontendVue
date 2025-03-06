<template>
  <div v-if="show" :class="[
    'fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 transition-all duration-300',
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  ]">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success',
      validator: (value: string) => ['success', 'danger'].includes(value)
    }
  }
});
</script> 