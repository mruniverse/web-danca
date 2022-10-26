import Vue from "vue";
import VueRouter from "vue-router";
import AccountRoutes from "./account";
import HomeRoutes from "./home";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/account/login",
  },{
    ...AccountRoutes
  },{
    ...HomeRoutes
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
