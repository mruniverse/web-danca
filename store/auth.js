import { ref } from "vue";
import { defineStore } from "pinia";
import api from '@/plugins/axios';
import nuxtStorage from 'nuxt-storage';

export const useAuthStore = defineStore("authStore", () => {
  const password = ref("");
  const expires_in = ref(86400);
  const created_at = ref(nuxtStorage.localStorage.getData("created_at") || "");
  const access_token = ref(nuxtStorage.localStorage.getData("access_token") || "");
  const refresh_token = ref(nuxtStorage.localStorage.getData("refresh_token") || "");
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
      created_at.value = getTimestampInSeconds();
      nuxtStorage.localStorage.setData("access_token", response.data.access_token);
      nuxtStorage.localStorage.setData("refresh_token", response.data.refresh_token);
      nuxtStorage.localStorage.setData("created_at", created_at.value);
      
      this.$route.push({ name: "Events" });
    })
  }

  function logout(){
    access_token.value = "";
    refresh_token.value = "";
    created_at.value = "";
    nuxtStorage.localStorage.removeItem("access_token");
    nuxtStorage.localStorage.removeItem("refresh_token");
    nuxtStorage.localStorage.removeItem("created_at");
    this.$route.push({ name: "Login" });
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
