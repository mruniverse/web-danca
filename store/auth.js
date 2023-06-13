import { ref, onMounted, watch } from "vue";
import { defineStore } from "pinia";
import { useAxios } from "@/plugins/axios";
import { useCookies } from "@/plugins/cookies";

export const useAuthStore = defineStore("authStore", () => {
  const cookies = useCookies();
  const email = ref(cookies.get("email") || "");
  const password = ref("");
  const expires_in = ref(86400);
  const login = ref(true);
  const register = ref(false);
  const api = useAxios();

  onMounted(() => {
    setAxiosHeader();
  });

  watch(email, () => {
    cookies.set("email", email.value);
  });

  function setAxiosHeader() {
    api.setHeader("Authorization", `Bearer ${getAccessToken()}`);
  }

  function getTimestampInSeconds() {
    return Math.floor(new Date().getTime() / 1000);
  }

  function getAccessToken() {
    return cookies.get("access_token");
  }

  function getCreatedAt() {
    return cookies.get("created_at");
  }

  function setAccessToken(token) {
    cookies.set("access_token", token);
  }

  function setRefreshToken(token) {
    cookies.set("refresh_token", token);
  }

  function setCreatedAt(timestamp) {
    cookies.set("created_at", timestamp);
  }

  async function authenticate() {
    return await api
      .post(
        "auth/authenticate",
        {},
        {
          auth: {
            username: email.value,
            password: password.value,
          },
        }
      )
      .then((response) => {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        setCreatedAt(getTimestampInSeconds());
        setAxiosHeader();
      });
  }

  function logout() {
    cookies.removeAll();
  }

  function showLogin() {
    login.value = true;
    register.value = false;
  }

  function showRegister() {
    login.value = false;
    register.value = true;
  }

  return {
    password,
    email,
    login,
    register,
    showLogin,
    showRegister,
    authenticate,
    logout,
    getTimestampInSeconds,
  };
});
