import Vue from 'vue';
import VueRouter from 'vue-router';
import Calculator from '../views/Calculator';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator,
  },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
