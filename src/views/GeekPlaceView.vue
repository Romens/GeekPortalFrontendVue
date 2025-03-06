<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-12">

    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@unhead/vue';
import BaseLayout from "@/layouts/BaseLayout.vue";

export default defineComponent({
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