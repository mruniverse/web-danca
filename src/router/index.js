import Vue from "vue";
import VueRouter from "vue-router";
import LoginRoutes from "./login";
import HomeRoutes from "./home";
import Main from "@/views/Main.vue";
import {useAuthStore} from "@/store/auth";
import { createApp } from "vue-demi";
import { createPinia } from 'pinia'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)


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

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   switch (to.name) {
//     case "Login":
//     case "Register":
//       if (authStore.isAuthenticated() && !authStore.tokenIsExpired()) {
//         next({ name: "Home" });
//       } else {
//         next();
//       }
//       break;
//     default:
//       if (authStore.isAuthenticated() && !authStore.tokenIsExpired()) {
//         next();
//       } else {
//         next({ name: "Login" });
//       }
//       break;
//   }
// });

export default router;
