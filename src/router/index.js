import Vue from 'vue';
import Router from 'vue-router';
import goodlist from '@/views/goodlist';
import cart from '@/views/cart';
import address from '@/views/address';
import orderConfirm from '@/views/orderConfirm';


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
    {
      path: '/address',
      name: 'address',
      component: address,
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm,
    },
  ]
})
