import Vue from "vue";
import VueRouter from "vue-router";
import AccountRoutes from "./account";
import Home from '@/views/account/Home'

Vue.use(VueRouter);

const routes = [
  {
    path: '/account',
    name: 'Home',
    component: Home
  }, { 
    ...AccountRoutes 
  }];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
