import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sibtract.ru/v1', // Уточню точный путь по YAML
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTours = (params) => api.get('/tours', { params });
export const fetchTourById = (id) => api.get(`/tours/${id}`);
// Добавим позже методы для карты, отзывов и контактов
