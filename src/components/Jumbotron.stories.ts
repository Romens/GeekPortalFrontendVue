// src/components/Jumbotron.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import Jumbotron from './Jumbotron.vue';

// Метаданные для Storybook
const meta: Meta<typeof Jumbotron> = {
    title: 'Components/Jumbotron', // Заголовок для Storybook
    component: Jumbotron, // Указываем компонент
    tags: ['autodocs'], // Добавляем тег для автоматической документации
};

export default meta;

type Story = StoryObj<typeof Jumbotron>;

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