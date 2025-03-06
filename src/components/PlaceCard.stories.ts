// src/components/PlaceCard.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import PlaceCard from './PlaceCard.vue';
import { Place } from '@/interfaces/Place'; // Импортируем интерфейс Place

// Метаданные для Storybook
const meta: Meta<typeof PlaceCard> = {
    title: 'Components/PlaceCard', // Заголовок для Storybook
    component: PlaceCard, // Указываем компонент
    tags: ['autodocs'], // Добавляем тег для автоматической документации
};

export default meta;

type Story = StoryObj<typeof PlaceCard>;

// Загрузка моковых данных из JSON-файла
const loadMockPlaces = async (): Promise<Place[]> => {
    const response = await fetch('/places/places_spb.json'); // Путь к JSON-файлу
    const data = await response.json();
    return data;
};

// Общие данные для историй
const mockPlace: Place = {
    uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Гик-кафе в Санкт-Петербурге',
    coordinates: [59.9343, 30.3351],
    description: 'Уютное место для гиков с тематическим интерьером.',
    image: 'https://placecats.com/200/200',
    city: {
        front_name: 'Санкт-Петербург',
        name: 'spb',
    },
    images: [
        'https://placecats.com/200/400',
        'https://placecats.com/200/401',
        'https://placecats.com/200/402',
    ],
    text: 'Гик-кафе в Санкт-Петербурге — это уникальное место, где вы можете насладиться атмосферой, созданной для настоящих фанатов технологий, видеоигр и комиксов. Здесь вы найдете тематический интерьер, вдохновленный популярными фильмами, сериалами и играми. В кафе регулярно проводятся турниры по настольным и видеоиграм, а также встречи с известными личностями из мира гик-культуры. Помимо этого, вы можете насладиться вкусными блюдами и напитками, названными в честь известных персонажей. Это идеальное место для встреч с друзьями, проведения времени с семьей или просто отдыха в одиночестве.',
    contacts: [
        {
            email: 'geekcafe@example.com',
            site: 'https://geekcafe.spb.ru',
            telephone: '+7 (812) 123-45-67',
        },
    ],
};

// Общая логика для загрузки данных
const commonLoaders = [
    async () => ({
        place: await loadMockPlaces().then((places) => places[0]), // Используем первое место из JSON
    }),
];

// Базовая история
export const Default: Story = {
    args: {
        place: mockPlace, // Используем общие данные
    },
    loaders: commonLoaders, // Используем общую логику загрузки
};

// История для темной темы
export const DarkMode: Story = {
    args: {
        place: mockPlace, // Используем общие данные
    },
    loaders: commonLoaders, // Используем общую логику загрузки
    parameters: {
        backgrounds: {
            default: 'dark', // Устанавливаем темный фон
            values: [{ name: 'dark', value: '#333' }], // Значение для темного фона
        },
    },
};