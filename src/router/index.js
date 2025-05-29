import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Lottery from '../components/Lottery.vue';
import YouBike from '../components/YouBike.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/lottery', name: 'Lottery', component: Lottery },
  { path: '/youbike', name: 'YouBike', component: YouBike },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;