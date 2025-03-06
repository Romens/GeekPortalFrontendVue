import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import zh from '@/locales/zh.json';
const messages = {
    en,
    ru,
    zh,
};
const i18n = createI18n({
    legacy: false, // Отключить legacy mode (требуется для Vue 3)
    locale: 'ru', // Язык по умолчанию
    fallbackLocale: 'en', // Резервный язык
    messages,
});
export default i18n;
//# sourceMappingURL=i18n.js.map