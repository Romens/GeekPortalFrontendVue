// src/components/Navbar.stories.ts
import type {Meta, StoryObj} from '@storybook/vue3';
import Navbar from './Navbar.vue';
import {withI18n} from '../../.storybook/withI18n.decorator';

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// Базовая история
export const Default: Story = {
    args: {},
};

// История для темной темы
export const DarkMode: Story = {
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [{name: 'dark', value: '#333'}],
        },
    },
};