import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GreetingView from '@/views/GreetingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Registration Form' },
    },
    {
      path: '/greeting',
      name: 'greeting',
      component: GreetingView,
      meta: { title: 'Greeting' },
    },
  ],
});

export default router;
