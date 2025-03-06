import Footer from './Footer.vue';
const meta = {
    title: 'Components/Footer', // Заголовок для Storybook
    component: Footer, // Указываем компонент
    tags: ['autodocs'], // Добавляем тег для автоматической документации
};
export default meta;
// Базовая история
export const Default = {
    args: {}, // Аргументы для компонента (если нужны)
};
// История для темной темы
export const DarkMode = {
    parameters: {
        backgrounds: {
            default: 'dark', // Устанавливаем темный фон
            values: [{ name: 'dark', value: '#333' }], // Значение для темного фона
        },
    },
};
//# sourceMappingURL=Footer.stories.js.map