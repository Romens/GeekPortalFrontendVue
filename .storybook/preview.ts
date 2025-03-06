import {type Preview, setup} from '@storybook/vue3';

import {type App} from 'vue';
import { withThemeByClassName } from '@storybook/addon-themes';

import i18n from "../src/i18n";

import {createPinia} from 'pinia';
import '../src/style.css';

const pinia = createPinia();

setup((app: App) => {
    app.use(i18n);
    app.use(pinia);
});

export const decorators = [
    withThemeByClassName({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
];


const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'light',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};