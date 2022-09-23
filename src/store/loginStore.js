import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", () => {
  const login = ref(true);
  const register = ref(false);

  function showLogin() {
    login.value = true;
    register.value = false;
  }

  function showRegister() {
    login.value = false;
    register.value = true;
  }

  return { login, register, showLogin, showRegister };
});
