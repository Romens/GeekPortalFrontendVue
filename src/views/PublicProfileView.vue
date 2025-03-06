<template>
  <BaseLayout>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <!-- Профиль пользователя -->
      <div v-if="userStore.user" class="space-y-6">
        <div class="flex items-center space-x-4">
          <div class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <img 
              v-if="userStore.user.photo_url" 
              :src="userStore.user.photo_url" 
              :alt="userStore.user.username"
              class="w-full h-full object-cover"
              @error="handleImageError"
            >
            <span v-else class="w-full h-full flex items-center justify-center text-3xl">👤</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ userStore.user.username }}
            </h1>
            <p v-if="userStore.user.title" class="text-lg text-gray-600 dark:text-gray-300">
              {{ userStore.user.title }}
            </p>
          </div>
        </div>

        <!-- Описание -->
        <div v-if="userStore.user.description" class="prose dark:prose-invert">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">О себе</h2>
          <p class="text-gray-600 dark:text-gray-300">{{ userStore.user.description }}</p>

          <div v-if="testEvent" class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Тестовое событие</h3>
            <div class="mt-2 space-y-2">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                <span class="font-medium">Данные:</span> {{ JSON.stringify(testEvent.data) }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                <span class="font-medium">Заголовки:</span> {{ JSON.stringify(testEvent.headers) }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                <span class="font-medium">Временная метка:</span> {{ testEvent.timestamp }}
              </p>
            </div>
          </div>
        </div>

        <!-- Дополнительная информация -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Дополнительная информация</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-2">
              <span class="text-gray-600 dark:text-gray-300">ID:</span>
              <span class="text-gray-900 dark:text-white">{{ userStore.user.id }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-600 dark:text-gray-300">Email:</span>
              <span class="text-gray-900 dark:text-white">{{ userStore.user.email }}</span>
            </div>
            <div v-if="userStore.isAdmin" class="flex items-center space-x-2">
              <span class="text-gray-600 dark:text-gray-300">Роль:</span>
              <span class="text-gray-900 dark:text-white">Администратор</span>
            </div>
          </div>
        </div>

        <!-- Статистика мест -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Статистика мест</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {{ userStore.user.visited_count || 0 }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Посещено мест</div>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {{ userStore.user.wanted_count || 0 }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Хочу посетить</div>
            </div>
            <div class="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
              <div class="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {{ userStore.user.favorites_count || 0 }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">В избранном</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Загрузка -->
      <div v-else-if="userStore.isLoading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>

      <!-- Ошибка -->
      <div v-else class="text-center text-red-600 dark:text-red-400">
        Профиль не найден
      </div>
    </div>
  </div>
</BaseLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import BaseLayout from '@/layouts/BaseLayout.vue';

interface TestEventData {
  data: any;
  headers: Record<string, any>;
  timestamp: string;
}

export default defineComponent({
  name: 'PublicProfileView',
  components: { BaseLayout },
  setup() {
    const userStore = useUserStore();
    const testEvent = ref<TestEventData | null>(null);
    const wsConnection = ref<any>(null);
    const connectionAttempts = ref(0);
    const maxRetries = 3;
    const connectionTimeout = 5000; // 5 секунд на подключение

    const initializeWebSocket = () => {
      try {
        console.log('🔄 Начинаем инициализацию WebSocket соединения...');
        console.log(`📊 Попытка подключения ${connectionAttempts.value + 1} из ${maxRetries}`);
        
        if (!window.Echo) {
          console.error('❌ Echo не инициализирован!');
          return;
        }

        // Таймер для отслеживания таймаута подключения
        const timeoutId = setTimeout(() => {
          console.error('⏰ Таймаут подключения к WebSocket');
          if (connectionAttempts.value < maxRetries) {
            connectionAttempts.value++;
            console.log('🔄 Повторная попытка подключения...');
            initializeWebSocket();
          } else {
            console.error('❌ Превышено максимальное количество попыток подключения');
          }
        }, connectionTimeout);

        console.log('📡 Подключаемся к каналу test-channel...');
        const channel = window.Echo.channel('test-channel');
        
        console.log('✨ Канал создан:', channel);
        console.log('🔍 Состояние Echo:', {
          connectionState: window.Echo.connector.pusher.connection.state,
          socketId: window.Echo.socketId(),
          options: window.Echo.options
        });

        channel
          .listen('.test.event', (event: TestEventData) => {
            console.log('📥 Событие test.event получено:', event);
            console.log('📋 Тип события:', typeof event);
            console.log('🔍 Структура события:', JSON.stringify(event, null, 2));
            testEvent.value = event;
          })
          .listen('.TokenExpired', (event: any) => {
            console.warn('🔑 Токен истек:', event);
            console.log('📊 Детали истечения токена:', {
              timestamp: new Date().toISOString(),
              event: event
            });
          })
          .subscribed(() => {
            console.log('✅ Успешно подписались на канал test-channel');
            clearTimeout(timeoutId); // Очищаем таймер при успешном подключении
            connectionAttempts.value = 0; // Сбрасываем счетчик попыток
          })
          .error((error: any) => {
            console.error('❌ Ошибка WebSocket:', error);
            console.error('🔍 Детали ошибки:', {
              message: error.message,
              type: error.type,
              code: error.code,
              timestamp: new Date().toISOString(),
              connectionState: window.Echo?.connector?.pusher?.connection?.state
            });
          });

        // Добавляем слушатели состояния соединения
        window.Echo.connector.pusher.connection.bind('connecting', () => {
          console.log('🔄 Устанавливается соединение...');
        });

        window.Echo.connector.pusher.connection.bind('connected', () => {
          console.log('✅ Соединение установлено');
          console.log('📊 Информация о соединении:', {
            socketId: window.Echo.socketId(),
            timestamp: new Date().toISOString()
          });
        });

        window.Echo.connector.pusher.connection.bind('disconnected', () => {
          console.log('❌ Соединение разорвано');
        });

        window.Echo.connector.pusher.connection.bind('failed', () => {
          console.error('💥 Соединение не удалось установить');
        });

      } catch (error) {
        console.error('💥 Критическая ошибка при инициализации WebSocket:', error);
        if (error instanceof Error) {
          console.error('📚 Стек ошибки:', error.stack);
          console.error('🔍 Дополнительная информация:', {
            timestamp: new Date().toISOString(),
            errorName: error.name,
            errorMessage: error.message
          });
        }
      }
    };

    const handleImageError = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        e.target.style.display = 'none';
        e.target.parentElement?.querySelector('span')?.classList.remove('hidden');
      }
    };

    onMounted(async () => {
      console.log('Компонент монтируется...');
      
      if (!userStore.user) {
        console.log('Пользователь не загружен, начинаем загрузку...');
        await userStore.fetchUserProfile();
        console.log('Профиль пользователя загружен:', userStore.user);
      }

      console.log('Запускаем инициализацию WebSocket...');
      initializeWebSocket();
    });

    onUnmounted(() => {
      console.log('Компонент размонтируется...');
      if (window.Echo) {
        console.log('Отключаем WebSocket соединение...');
        window.Echo.leaveChannel('test-channel');
        console.log('WebSocket соединение закрыто');
      }
    });

    return {
      userStore,
      testEvent,
      handleImageError
    };
  }
});
</script> 