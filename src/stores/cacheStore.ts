import { defineStore } from 'pinia';

interface City {
  uuid: string;
  name: string;
  front_name: string;
}

interface Category {
  id: number;
  url: string;
  front_name: string;
}

interface WebMap {
  name: string;
  url: string;
  attribution: string;
}

export const useCacheStore = defineStore('cache', {
  state: () => ({
    cities: [] as City[],
    categories: [] as Category[],
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
    ] as WebMap[],
  }),

  actions: {
    async fetchCacheData() {
      try {
        const response = await fetch('https://api.geekportal.org');
        const data = await response.json();
        this.cities = data.cities;
        this.categories = data.categories;
      } catch (error) {
        console.error('Ошибка при загрузке кэшированных данных:', error);
      }
    },
  },
}); 