<template>
  <BaseLayout>
    <div class="container mx-auto px-4 py-12">
      <TextQuerySearch />
      <h1 class="text-3xl font-bold text-center mb-8">
        {{ $t('places_view.title') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
        {{ $t('places_view.subtitle') }}
      </p>

      <!-- Сетка карточек -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceCard
            v-for="place in places"
            :key="place.uuid"
            :place="place"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Place } from '@/interfaces/Place';
import PlaceCard from "@/components/PlaceCard.vue";
import TextQuerySearch from "@/components/TextQuerySearch.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

export default defineComponent({
  name: 'PlacesView',
  components: {
    BaseLayout,
    TextQuerySearch,
    PlaceCard,
  },
  metaInfo: {
    title: 'Гик-места | GeekPortal',
    meta: [
      {
        name: 'description',
        content: 'Исследуйте лучшие гик-места в вашем городе с GeekPortal. Кафе, магазины, коворкинги и многое другое.',
      },
    ],
  },
  setup() {
    const places = ref<Place[]>([]);

    // Загрузка данных из JSON
    onMounted(async () => {
      const response = await fetch('/places/places_spb.json');
      places.value = await response.json();
    });

    return {
      places,
    };
  },
});
</script>