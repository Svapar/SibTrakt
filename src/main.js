import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css'; // или Tailwind

createApp(App).use(router).mount('#app');
localStorage.removeItem('token'); 