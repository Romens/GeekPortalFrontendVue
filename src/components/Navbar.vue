<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Кнопка меню для мобильных устройств -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <!-- Логотип по центру на мобильных устройствах -->
        <div class="flex-grow text-center md:text-left md:flex-grow-0">
          <router-link to="/" class="text-xl font-bold text-gray-900 dark:text-white">
            GeekPortal
          </router-link>
        </div>

        <!-- Пустой блок для выравнивания на мобильных устройствах -->
        <div class="w-8 md:hidden"></div>

        <!-- Главное меню для десктопов -->
        <div class="hidden md:flex space-x-8 items-center">
          <router-link
              to="/places"
              class="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            {{ $t('navbar.places') }}
          </router-link>
          <router-link
              to="/map"
              class="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            {{ $t('navbar.map') }}
          </router-link>
          <router-link
              to="/about"
              class="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            {{ $t('navbar.about') }}
          </router-link>
        </div>

        <!-- Правая часть: тема, язык и профиль -->
        <div class="hidden md:flex items-center space-x-4">
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

          <!-- Иконка пользователя -->
          <div v-if="userStore.isAuthenticated" class="flex items-center space-x-2">
            <!-- Иконка пользователя -->
            <div v-if="userStore.isAuthenticated" class="flex items-center space-x-2 relative">
              <button
                  @click="isUserDropdownOpen = !isUserDropdownOpen"
                  class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
              {{ userStore.user?.username }}
              </button>

              <!-- Dropdown меню -->
              <div
                  v-if="isUserDropdownOpen"
                  class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50"
                  @click="isUserDropdownOpen = false"
              >
                <div class="py-1">
                  <router-link
                      to="/profile"
                      class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    👤 {{ $t('navbar.profile') }}
                  </router-link>
                  <router-link
                      to="/profile/settings"
                      class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    ⚙️ {{ $t('navbar.profile_settings') }}
                  </router-link>
                  <router-link
                      v-if="userStore.isAdmin"
                      to="/admin"
                      class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    🛠️ {{ $t('navbar.admin') }}
                  </router-link>
                  <router-link
                      v-if="userStore.isAdmin || userStore.isManager"
                      to="/add-geek-place"
                      class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    📍 {{ $t('navbar.add_place') }}
                  </router-link>
                  <button
                      @click="handleLogout"
                      class="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    🚪 {{ $t('navbar.logout') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
              v-else
              @click="isAuthModalOpen = true"
              class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            👤
          </button>
        </div>
      </div>
    </div>

    <!-- Затемнение фона при открытии меню (с прозрачностью 50%) -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black opacity-50 z-40 md:hidden" @click="isMobileMenuOpen = false"></div>

    <!-- Боковая панель для мобильных устройств -->
    <div v-if="isMobileMenuOpen" class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out">
      <div class="flex flex-col h-full p-4">
        <!-- Логотип в боковом меню -->
        <div class="flex items-center justify-between mb-4">
          <router-link to="/" class="text-xl font-bold text-gray-900 dark:text-white" @click="isMobileMenuOpen = false">
            GeekPortal
          </router-link>
          <!-- Кнопка закрытия -->
          <button @click="isMobileMenuOpen = false" class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Мобильное меню -->
        <div class="flex-grow">
          <router-link
              to="/places"
              class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="isMobileMenuOpen = false"
          >
            {{ $t('navbar.places') }}
          </router-link>
          <router-link
              to="/map"
              class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="isMobileMenuOpen = false"
          >
            {{ $t('navbar.map') }}
          </router-link>
          <router-link
              to="/about"
              class="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="isMobileMenuOpen = false"
          >
            {{ $t('navbar.about') }}
          </router-link>
        </div>

        <!-- Правая часть: тема, язык и профиль -->
        <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div class="flex flex-col space-y-4">
            <!-- Кнопка переключения темы -->
            <button
                @click="toggleTheme"
                class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <span v-if="isDarkMode">🌞</span>
              <span v-else>🌙</span>
            </button>

            <!-- Иконка пользователя -->
            <button
                @click="isAuthModalOpen = true"
                class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              👤
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно авторизации -->
    <div v-if="isAuthModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Авторизация</h2>
          <button @click="isAuthModalOpen = false" class="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="flex justify-between items-center mb-4">
          <telegram-login-temp
              mode="redirect"
              telegram-login="geekportalbot"
              redirect-url="https://api.geekportal.org/login/telegram"
          />
        </div>
        <form v-show="false" @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
                type="email"
                id="email"
                v-model="loginForm.email"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
            <input
                type="password"
                id="password"
                v-model="loginForm.password"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                required
            />
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Войти
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { telegramLoginTemp } from 'vue3-telegram-login';
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useThemeStore } from '@/stores/themeStore';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import axios from "axios";

const SUPPORTED_LANGUAGES = [
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  // Добавить новый язык здесь
];

export default defineComponent({
  name: 'Navbar',
  components: {
    telegramLoginTemp,
  },
  setup() {
    const themeStore = useThemeStore();
    const userStore = useUserStore();
    const isDarkMode = ref(themeStore.isDarkMode);
    const { locale } = useI18n();
    const isLanguageTooltipOpen = ref(false);
    const isUserDropdownOpen = ref(false);
    const isMobileMenuOpen = ref(false);
    const isAuthModalOpen = ref(false);

    const loginForm = ref({
      email: '',
      password: '',
    });

    const supportedLanguages = ref(SUPPORTED_LANGUAGES);

    const currentLanguage = computed(() => {
      return supportedLanguages.value.find(lang => lang.code === locale.value) || supportedLanguages.value[0];
    });


    if (window.location.hash.startsWith('#token=')) {
      localStorage.setItem('geekportal_auth', window.location.hash.substring(7));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.location.hash.substring(7);
      window.location.hash = '';
    }

    const toggleTheme = () => {
      themeStore.toggleTheme();
      isDarkMode.value = themeStore.isDarkMode;
    };

    const changeLanguage = (newLocale: string) => {
      locale.value = newLocale;
      isLanguageTooltipOpen.value = false;
      isMobileMenuOpen.value = false; // Закрываем меню после выбора языка
    };

    const handleLogin = () => {
      // Логика авторизации
      console.log('Login with:', loginForm.value);
      isAuthModalOpen.value = false; // Закрываем модальное окно после авторизации
    };

    const handleLogout = async () => {
      try {
        console.log('Начинаем процесс выхода из системы');
        const token = localStorage.getItem('geekportal_auth');
        console.log('Токен получен:', token ? 'присутствует' : 'отсутствует');
        await axios.post('https://api.geekportal.org/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Запрос на выход выполнен успешно');
        localStorage.removeItem('geekportal_auth');
        console.log('Токен удален из localStorage');
        delete axios.defaults.headers.common['Authorization'];
        console.log('Токен удален из заголовков запросов');
        userStore.$reset();
        console.log('Состояние пользователя сброшено');
        isUserDropdownOpen.value = false;
        console.log('Выпадающее меню пользователя закрыто');
      } catch (error) {
        console.error('Ошибка при выходе из системы:', error);
      }
    };

    // Загружаем профиль пользователя при монтировании компонента
    onMounted(() => {
      isDarkMode.value = themeStore.isDarkMode;
      axios.get('/sanctum/csrf-cookie').then(response => {
        userStore.fetchUserProfile();
      });
    });

    return {
      isDarkMode,
      toggleTheme,
      locale,
      changeLanguage,
      isLanguageTooltipOpen,
      supportedLanguages,
      currentLanguage,
      isMobileMenuOpen,
      isUserDropdownOpen,
      isAuthModalOpen,
      loginForm,
      handleLogin,
      handleLogout,
      userStore,
    };
  },
});
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>