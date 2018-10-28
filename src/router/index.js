import Vue from 'vue';
import Router from 'vue-router';
import goodlist from '@/views/goodlist';
import cart from '@/views/cart';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodlist',
      component: goodlist,
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
    },
  ]
})
