<template>
  <BaseLayout>
    <div class="p-6 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6 dark:text-white">Настройки профиля</h1>

      <AlertMessage
        :show="alert.show"
        :message="alert.message"
        :type="alert.type"
      />

      <form @submit.prevent="saveProfile" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block mb-2 dark:text-white">Название профиля</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Введите название профиля"
            >
            <span class="text-red-500 text-sm">{{ errors.title?.[0] }}</span>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Описание</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Расскажите о себе"
            ></textarea>
            <span class="text-red-500 text-sm">{{ errors.description?.[0] }}</span>
          </div>

          <div>
            <label class="block mb-2 dark:text-white">Фотография профиля</label>
            
            <!-- Предпросмотр фото -->
            <div v-if="form.photo_url" class="mb-4">
              <img 
                :src="form.photo_url"
                alt="Предпросмотр фото профиля"
                class="w-32 h-32 object-cover rounded-lg"
                @error="handleImageError"
              >
            </div>

            <!-- Загрузка файла -->
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="mb-2 block w-full text-sm text-gray-900 dark:text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-gray-700 dark:file:text-gray-200"
            >

            <!-- URL фото -->
            <input
              v-model="form.photo_url"
              type="url"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Или введите URL фотографии"
            >
            <span class="text-red-500 text-sm">{{ errors.photo_url?.[0] }}</span>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            :disabled="userStore.isLoading"
          >
            {{ userStore.isLoading ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          <button
            type="button"
            @click="router.back()"
            class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import BaseLayout from '@/layouts/BaseLayout.vue';
import AlertMessage from '@/components/AlertMessage.vue';

interface ProfileForm {
  title: string;
  description: string;
  photo_url?: string;
  photo?: File;
}

interface Alert {
  show: boolean;
  message: string;
  type: 'success' | 'danger';
}

export default defineComponent({
  components: { BaseLayout, AlertMessage },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    
    const form = reactive<ProfileForm>({
      title: '',
      description: '',
      photo_url: ''
    });

    const errors = ref<Record<string, string[]>>({});
    
    const alert = reactive<Alert>({
      show: false,
      message: '',
      type: 'success'
    });

    const showAlert = (message: string, type: 'success' | 'danger') => {
      alert.show = true;
      alert.message = message;
      alert.type = type;
      
      setTimeout(() => {
        alert.show = false;
      }, 3000);
    };

    onMounted(async () => {
      try {
        await userStore.fetchUserProfile();
        if (userStore.user) {
          form.title = userStore.user.title || '';
          form.description = userStore.user.description || '';
          form.photo_url = userStore.user.photo_url || '';
        }
      } catch (error) {
        showAlert('Не удалось загрузить данные профиля', 'danger');
      }
    });

    const saveProfile = async () => {
      try {
        const formData: Partial<ProfileForm> = { ...form };
        // Если есть файл для загрузки, удаляем photo_url из запроса
        if (formData.photo) {
          formData.photo_url = undefined;
        }
        await userStore.updateProfile(formData as ProfileForm);
        showAlert('Профиль успешно обновлен', 'success');
      } catch (error) {
        showAlert('Ошибка при обновлении профиля', 'danger');
        if (error && typeof error === 'object') {
          errors.value = error as Record<string, string[]>;
        }
      }
    };

    const handleImageError = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        e.target.style.display = 'none';
      }
    };

    const handleFileUpload = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) {
        const file = target.files[0];
          form.photo = file;
      }
    };

    return {
      form,
      errors,
      userStore,
      router,
      alert,
      saveProfile,
      handleImageError,
      handleFileUpload
    };
  }
});
</script> 