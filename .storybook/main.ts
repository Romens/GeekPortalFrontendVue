import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  storyStoreV7: false,
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
};
export default config;
