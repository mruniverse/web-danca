import { ref } from "vue";
import { defineStore } from "pinia";
import nuxtStorage from "nuxt-storage";

export const useAuthStore = defineStore("authStore", () => {
  const password = ref("");
  const expires_in = ref(86400);
  const created_at = ref(nuxtStorage.localStorage.getData("created_at") || "");
  const access_token = ref(
    nuxtStorage.localStorage.getData("access_token") || ""
  );
  const refresh_token = ref(
    nuxtStorage.localStorage.getData("refresh_token") || ""
  );
  const email = ref("");
  const login = ref(true);
  const register = ref(false);
  const route = useRoute();

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
    return getTimestampInSeconds() - getCreatedAt() > getExpiresIn();
  }

  async function authenticate(data) {
    password.value = data.password;
    email.value = data.email;

    response = await useFetch("http://new.webdanca.com:8084/v1/auth/authenticate", {
      method: "POST",
      body: {
        auth: {
          username: email.value,
          password: password.value,
        },
      },
    });

    console.log(response);
  }

  function logout() {
    access_token.value = "";
    refresh_token.value = "";
    created_at.value = "";
    nuxtStorage.localStorage.removeItem("access_token");
    nuxtStorage.localStorage.removeItem("refresh_token");
    nuxtStorage.localStorage.removeItem("created_at");
    route.push({ name: "login" });
  }

  function isAuthenticated() {
    return access_token.value !== "";
  }

  function getAccessToken() {
    return access_token.value;
  }

  function showlogin() {
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
    showlogin,
    showRegister,
    authenticate,
    isAuthenticated,
    logout,
    getAccessToken,
    tokenIsExpired,
    getCreatedAt,
    getTimestampInSeconds,
  };
});
