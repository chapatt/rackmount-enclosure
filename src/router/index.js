import Vue from 'vue';
import VueRouter from 'vue-router';
import Calculator from '../views/Calculator';

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator,
  },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
