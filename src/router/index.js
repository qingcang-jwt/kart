import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['@/views/main/Index.vue'], resolve),
    children: [
      {
        path: '/member',
        name: 'member',
        component: resolve => require(['@/views/member/MemberList.vue'], resolve),
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
