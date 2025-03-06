// .storybook/withI18n.decorator.ts
import { createI18n } from 'vue-i18n';
// Импортируйте ваши языковые файлы
import en from '../src/locales/en.json';
import ru from '../src/locales/ru.json';
import zh from '../src/locales/zh.json';
// Создайте экземпляр i18n
const i18n = createI18n({
    legacy: false, // Отключите legacy mode (требуется для Vue 3)
    locale: 'ru', // Язык по умолчанию
    fallbackLocale: 'en', // Резервный язык
    messages: { en, ru, zh }, // Сообщения для языков
});
// Декоратор для добавления i18n в Storybook
export const withI18n = (story, context) => {
    return {
        ...story,
        global: {
            plugins: [i18n], // Добавьте i18n в плагины
        },
    };
};
//# sourceMappingURL=withI18n.decorator.js.map