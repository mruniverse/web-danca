import { ref } from "vue";
import { defineStore } from "pinia";
import api from '@/plugins/axios';
import router from "@/router";

export const useAuthStore = defineStore("authStore", () => {
  const password = ref("");
  const access_token = ref(localStorage.getItem("access_token") || "");
  const refresh_token = ref(localStorage.getItem("refresh_token") || "");
  const email = ref("");
  const login = ref(true);
  const register = ref(false);

  async function authenticate(data) {
    password.value = data.password;
    email.value = data.email;

    return await api.post("auth/authenticate", {}, {
      auth: {
        username: email.value,
        password: password.value,
      },
    }).then((response) => {
      access_token.value = response.data.access_token;
      refresh_token.value = response.data.refresh_token;
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      router.push({ name: "Home" });
    })
  }

  function logout(){
    access_token.value = "";
    refresh_token.value = "";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push({ name: "Login" });
  }

  function isAuthenticated(){
    return access_token.value !== "";
  }

  function showLogin() {
    login.value = true;
    register.value = false;
  }

  function showRegister() {
    login.value = false;
    register.value = true;
  }

  return { password, email, login, register, showLogin, showRegister, authenticate, isAuthenticated, logout };
});
