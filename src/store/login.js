import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", () => {
  const username = ref("Yuri Luz");
  const password = ref("");
  const email = ref("emailteste@teste.com.br");
  const login = ref(true);
  const register = ref(false);

  function submitLogin(data) {
    username.value = data.username;
    password.value = data.password;
    email.value = data.email;
  }

  function showLogin() {
    login.value = true;
    register.value = false;
  }

  function showRegister() {
    login.value = false;
    register.value = true;
  }

  return { username, password, email, login, register, showLogin, showRegister, submitLogin };
});
