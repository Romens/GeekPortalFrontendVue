import { defineStore } from 'pinia';
export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDarkMode: false,
    }),
    actions: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            // Сохраняем тему в localStorage
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
            // Применяем тему к body
            document.body.classList.toggle('dark', this.isDarkMode);
        },
        initializeTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                this.isDarkMode = true;
                document.body.classList.add('dark');
            }
            else {
                this.isDarkMode = false;
                document.body.classList.remove('dark');
            }
        },
    },
});
//# sourceMappingURL=themeStore.js.map