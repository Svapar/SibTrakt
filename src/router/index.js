import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Tours from '../views/Tours.vue';
import Tour from '../views/Tour.vue';
import Map from '../views/Map.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tours', name: 'Tours', component: Tours },
  { path: '/tours/:id', name: 'Tour', component: Tour, props: true },
  { path: '/map', name: 'Map', component: Map },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;