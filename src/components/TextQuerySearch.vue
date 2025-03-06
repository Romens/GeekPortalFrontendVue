<template>
  <div class="p-4 sm:p-8 bg-blue-50 rounded-lg shadow-md flex justify-center items-center">
    <!-- Основной текст с фильтрами -->
    <div class="flex flex-wrap items-center gap-0.5 text-xl sm:text-3xl font-bold text-gray-800 text-center">
      <span v-for="(part, index) in parts" :key="index" class="flex items-center">
        <!-- Обычный текст -->
        <span v-if="part.type === 'text'" class="text-gray-800">{{ part.value }}</span>
        <!-- Фильтр -->
        <span v-else class="relative">
          <span
              @click.stop="openDropdown(part.key, index)"
              class="cursor-pointer px-1 py-0.5 rounded-md transition-colors duration-200"
              :class="{
              'text-blue-600 hover:text-blue-700': activeDropdown === part.key,
              'text-blue-500 hover:text-blue-600': activeDropdown !== part.key,
            }"
          >
            {{ part.value }}
          </span>
          <!-- Dropdown для выбора значения -->
          <div
              v-if="activeDropdown === part.key"
              :ref="(el) => (dropdownRefs[index] = el)"
              class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div class="py-1">
              <button
                  v-for="option in getOptions(part.key)"
                  :key="option.value"
                  @click.stop="selectOption(part.key, option)"
                  class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';

// Состояние фильтров
const filters = ref({
  SortBy: 'Лучшие',
  type: 'гик-места',
  place: 'Санкт-Петербурге',
  scope: 'всех',
});

// Активный dropdown
const activeDropdown = ref(null);

// Ссылки на дропдауны
const dropdownRefs = ref([]);

// Обработчик клика вне области
const handleClickOutside = (event) => {
  if (
      dropdownRefs.value.some(
          (dropdown) => dropdown && dropdown.contains(event.target)
      ) === false
  ) {
    activeDropdown.value = null;
    document.removeEventListener('click', handleClickOutside);
  }
};

// Открыть dropdown для выбора значения
const openDropdown = (key, index) => {
  if (activeDropdown.value === key) {
    activeDropdown.value = null;
    document.removeEventListener('click', handleClickOutside);
  } else {
    activeDropdown.value = key;
    document.addEventListener('click', handleClickOutside);
  }
};

// Удалить слушатель при размонтировании
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Получить опции для фильтра
const getOptions = (key) => {
  return options[key];
};

// Выбрать новое значение для фильтра
const selectOption = (key, option) => {
  filters.value[key] = option.label;
  activeDropdown.value = null;
  document.removeEventListener('click', handleClickOutside);
};

// Опции для каждого фильтра
const options = {
  SortBy: [
    { value: 'best', label: 'Лучшие' },
    { value: 'all', label: 'Все' },
    { value: 'latest', label: 'Последние' },
  ],
  type: [
    { value: 'geek_places', label: 'гик-места' },
    { value: 'events', label: 'события' },
  ],
  place: [
    { value: 'msk', label: 'Москве' },
    { value: 'spb', label: 'Санкт-Петербурге' },
    { value: 'chaikovsky', label: 'городе Чайковском' },
    { value: 'russia', label: 'России' },
  ],
  scope: [
    { value: 'all', label: 'всех' },
    { value: 'couple', label: 'похода вдвоём' },
    { value: 'company', label: 'компании' },
    { value: 'alone', label: 'одиночек' },
  ],
};

// Функция для корректного отображения текста в зависимости от фильтров
const getDisplayText = (key, value) => {
  if (key === 'place') {
    // Для места добавляем предлог "в" или "в городе"
    if (value === 'городе Чайковском') {
      return `в ${value}`;
    }
    return `в ${value}`;
  }
  if (key === 'scope') {
    // Для аудитории добавляем предлог "для" и корректное окончание
    if (value === 'компании') {
      return `для ${value}`;
    }
    if (value === 'одиночек') {
      return `для ${value}`;
    }
    return `для ${value}`;
  }
  return value;
};

// Разделение текста на части (обычный текст и фильтры)
const parts = computed(() => {
  const text = `{SortBy} {type} {place} {scope}`;
  return text.split(/(\{.*?\})/).map((part) => {
    const match = part.match(/\{(.*?)\}/);
    if (match) {
      const key = match[1];
      return {
        type: 'filter',
        key,
        value: getDisplayText(key, filters.value[key]),
      };
    }
    return {
      type: 'text',
      value: part,
    };
  });
});
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>