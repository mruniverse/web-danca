import VueRouter from "vue-router";
import LoginRoutes from "./login";
import HomeRoutes from "./home";
import Main from "@/views/Main.vue";
import {useAuthStore} from "@/store/auth";

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

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  switch (to.name) {
    case "Login":
    case "Register":
      if (authStore.isAuthenticated() && !authStore.tokenIsExpired()) {
        next({ name: "Events" });
      } else {
        next();
      }
      break;
    default:
      if (authStore.isAuthenticated() && !authStore.tokenIsExpired()) {
        next();
      } else {
        next({ name: "Login" });
      }
      break;
  }
});

export default router;
