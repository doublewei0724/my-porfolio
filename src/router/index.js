import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Lottery from '../components/Lottery.vue';
import Chart from '../components/Chart.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/lottery', name: 'Lottery', component: Lottery },
  { path: '/chart', name: 'Chart', component: Chart }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;