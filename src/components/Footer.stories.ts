// src/components/Footer.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import Footer from './Footer.vue';

const meta: Meta<typeof Footer> = {
    title: 'Components/Footer', // Заголовок для Storybook
    component: Footer, // Указываем компонент
    tags: ['autodocs'], // Добавляем тег для автоматической документации
};

export default meta;

type Story = StoryObj<typeof Footer>;

// Базовая история
export const Default: Story = {
    args: {}, // Аргументы для компонента (если нужны)
};

// История для темной темы
export const DarkMode: Story = {
    parameters: {
        backgrounds: {
            default: 'dark', // Устанавливаем темный фон
            values: [{ name: 'dark', value: '#333' }], // Значение для темного фона
        },
    },
};