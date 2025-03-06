import Navbar from './Navbar.vue';
const meta = {
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
};
export default meta;
// Базовая история
export const Default = {
    args: {},
};
// История для темной темы
export const DarkMode = {
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [{ name: 'dark', value: '#333' }],
        },
    },
};
//# sourceMappingURL=Navbar.stories.js.map