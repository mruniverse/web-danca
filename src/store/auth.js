import { ref } from "vue";
import { defineStore } from "pinia";
import api from '@/plugins/axios';
import router from "@/router";

export const useAuthStore = defineStore("authStore", () => {
  const password = ref("");
  const expires_in = ref(86400);
  const created_at = ref(localStorage.getItem("created_at") || "");
  const access_token = ref(localStorage.getItem("access_token") || "");
  const refresh_token = ref(localStorage.getItem("refresh_token") || "");
  const email = ref("");
  const login = ref(true);
  const register = ref(false);

  /**
   * Get the timestamp when the token was created
   * @returns {number}
   */
  function getCreatedAt() {
    return created_at.value;
  }

  /**
   * Get the token expiration time in seconds
   * @returns {number}
   */
  function getExpiresIn() {
    return expires_in.value;
  }

  /**
   * Get the current timestamp in seconds
   * @returns {number}
   */
  function getTimestampInSeconds() {
    return Math.floor(new Date().getTime() / 1000);
  }

  function tokenIsExpired() {
    return (getTimestampInSeconds() - getCreatedAt()) > getExpiresIn();
  }

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
      created_at.value = new Date().getTime();
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("created_at", created_at.value);
      
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

  function getAccessToken(){
    return access_token.value;
  }

  function showLogin() {
    login.value = true;
    register.value = false;
  }

  function showRegister() {
    login.value = false;
    register.value = true;
  }

  return { password, email, login, register, showLogin, showRegister, authenticate, isAuthenticated, logout, getAccessToken, tokenIsExpired, getCreatedAt, getTimestampInSeconds };
});
