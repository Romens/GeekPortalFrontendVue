<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-black dark:bg-gray-900">
    <router-link to="/">
      <img src="/long_logo.png" alt="Logo" class="mb-8 w-48" />
    </router-link>
    <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md mx-4">
      <!-- Никнейм -->
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-white">
          {{ $t('registration_view.username.label') }}
        </label>
        <input
            v-model="form.username"
            type="text"
            id="username"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            minlength="4"
            maxlength="70"
            required
        />
        <span v-if="errors.username" class="text-sm text-red-500">{{ errors.username }}</span>
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700  dark:text-white">
          {{ $t('registration_view.email.label') }}
        </label>
        <input
            v-model="form.email"
            type="email"
            autocomplete="username"
            id="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
        <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
      </div>

      <!-- Дата рождения -->
      <div class="mb-4">
        <label for="birthdate" class="block text-sm font-medium text-gray-700 dark:text-white">
          {{ $t('registration_view.birthdate.label') }}
        </label>
        <input
            v-model="form.birthdate"
            type="date"
            id="birthdate"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
        <span v-if="errors.birthdate" class="text-sm text-red-500">{{ errors.birthdate }}</span>
      </div>

      <!-- Пароль -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-white">
          {{ $t('registration_view.password.label') }}
        </label>
        <input
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            id="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            minlength="8"
            required
        />
        <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
      </div>

      <!-- Повторение пароля -->
      <div class="mb-6">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-white">
          {{ $t('registration_view.confirm_password.label') }}
        </label>
        <input
            v-model="form.confirmPassword"
            type="password"
            autocomplete="new-password"
            id="confirmPassword"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
        />
        <span v-if="errors.confirmPassword" class="text-sm text-red-500">{{ errors.confirmPassword }}</span>
      </div>

      <!-- Кнопка отправки -->
      <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :disabled="loading"
      >
        {{ loading ? 'Регистрация...' : $t('registration_view.submit_button') }}
      </button>

      <!-- Переключение темы и языка -->
      <div class="mt-6 flex justify-center space-x-4">
        <!-- Кнопка переключения темы -->
        <button
            @click="toggleTheme"
            class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <span v-if="isDarkMode">🌞</span>
          <span v-else>🌙</span>
        </button>

        <!-- Tooltip для выбора языка -->
        <div class="relative">
          <button
              @click="isLanguageTooltipOpen = !isLanguageTooltipOpen"
              class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {{ currentLanguage.flag }}
          </button>

          <!-- Tooltip с выбором языка -->
          <div
              v-if="isLanguageTooltipOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50"
          >
            <div class="py-1">
              <button
                  v-for="lang in supportedLanguages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  class="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {{ lang.flag }} {{ lang.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/themeStore';
import { useRegisterStore } from '@/stores/registerStore';

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const registerStore = useRegisterStore();

const { form, errors, loading } = registerStore;

const isDarkMode = ref(themeStore.isDarkMode);
const isLanguageTooltipOpen = ref(false);

const SUPPORTED_LANGUAGES = [
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
];

const supportedLanguages = ref(SUPPORTED_LANGUAGES);

const currentLanguage = computed(() => {
  return supportedLanguages.value.find(lang => lang.code === locale.value) || supportedLanguages.value[0];
});

const toggleTheme = () => {
  themeStore.toggleTheme();
  isDarkMode.value = themeStore.isDarkMode;
};

const changeLanguage = (newLocale) => {
  locale.value = newLocale;
  isLanguageTooltipOpen.value = false;
};

const handleSubmit = async () => {
  await registerStore.register();
};
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>