import axios from 'axios';
const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: 'http://93.81.235.62:7575/api/v1/', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}` 
  }
});

export default {
  
  getDestinations() {
    return apiClient.get('/destinations/');
  },

  getDestinationContacts() {
    return apiClient.get('/pairsnodes/');
  },

  getRoutes() {
    return apiClient.get('/routers/');
  }
};