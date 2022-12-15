import Vue from "vue";
import VueRouter from "vue-router";
import LoginRoutes from "./login";
import HomeRoutes from "./home";
import Main from "@/views/account/Main.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: 'Main',
    component: Main,
    children: []
  },{
    ...LoginRoutes
  },{
    ...HomeRoutes
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
