import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyAPI = {
  getPublicList: async () => {
    const response = await api.get('/properties/public-list');
    return response.data;
  },
  getPublicBySlug: async (slug: string) => {
    const response = await api.get(`/properties/public/${slug}`);
    return response.data;
  },
};

export default api;
