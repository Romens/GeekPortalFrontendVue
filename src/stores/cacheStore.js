import { defineStore } from 'pinia';
export const useCacheStore = defineStore('cache', {
    state: () => ({
        cities: [],
        categories: [],
        webMaps: [
            {
                name: 'osm',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
            {
                name: '2gis',
                url: 'https://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1&ts=online_hd',
                attribution: '&copy; <a href="https://2gis.ru">2GIS</a>',
            },
            {
                name: 'carto-dark',
                url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
            {
                name: 'google',
                url: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                attribution: '&copy; Google Maps',
            },
        ],
    }),
    actions: {
        async fetchCacheData() {
            try {
                const response = await fetch('https://api.geekportal.org');
                const data = await response.json();
                this.cities = data.cities;
                this.categories = data.categories;
            }
            catch (error) {
                console.error('Ошибка при загрузке кэшированных данных:', error);
            }
        },
    },
});
//# sourceMappingURL=cacheStore.js.map