<template>
  <v-app class="main">
    <v-col class="fill-height pa-0">
      <v-row no-gutters class="logo">
        <img width="200" src="@/assets/logo-horizontal.svg" />
      </v-row>
      <v-row no-gutters class="login-sheet" justify="center">
        <v-sheet class="login-sheet-style d-flex align-center">
          <v-overlay absolute :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
          <v-row no-gutters class="d-flex justify-center">
            <v-col cols="9">
              <v-row no-gutters justify="start">
                <p class="login-title-text">Entre com e-mail e senha</p>
              </v-row>
              <v-row no-gutters>
                <v-text-field v-model="auth.email" append-icon="mdi-email-outline" label="E-mail" outlined
                  class="login-input-style" @blur="v$.email.$touch" :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''
                    ">
                </v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-text-field v-model="auth.password" label="Senha" outlined
                  :style="{ 'font-size': passwordVisibility ? '22px' : '' }"
                  :type="passwordVisibility ? 'password' : 'text'"
                  :append-icon="passwordVisibility ? 'mdi-lock-off-outline' : 'mdi-lock-outline'"
                  @click:append="() => (passwordVisibility = !passwordVisibility)" @blur="v$.password.$touch"
                  :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''">
                </v-text-field>
              </v-row>
              <v-row no-gutters>
                <v-col align-self="end">
                  <a>Esqueci a senha</a>
                </v-col>
                <v-col align="end">
                  <v-btn @click="submit()" style="border-radius: 13px" elevation="0" color="#2887DA" dark> Entrar </v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-5">
                <v-divider></v-divider>
              </v-row>
              <v-row no-gutters justify="center" class="mt-10 mb-n5">
                <p class="have-you-registered-text">É novo no Web Dança?</p>
                <a @click="$router.push({ name: 'Register' })" class="px-2">Cadastre-se</a>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-col>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import { useToast } from "@/plugins/toast.js";
import { useAuthStore } from "../store/auth";
import { useRouter } from "@/plugins/router";

const toast = useToast();
const router = useRouter();
const auth = useAuthStore();
const passwordVisibility = ref("password");
const loading = ref(false);

const validations = {
  email: {
    required: helpers.withMessage("O E-mail é obrigatório", required),
    email: helpers.withMessage("E-mail inválido", email),
  },
  password: {
    required: helpers.withMessage("A senha é obrigatória", required),
  },
};

const v$ = useVuelidate(validations, auth);

function whileLoading(callback){
  loading.value = true;
  callback();
  loading.value = false;
}

async function submit() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return toast.error(v$.value.$errors[0].$message);
  } else {
    whileLoading(async () => {
      await auth.authenticate();
      router.push("/home/events")
    });
 }
}
</script>

<style lang="scss" scoped>
@import "@/assets/loginComponent.scss";
@import "@/assets/loginScreen.scss";

.teste {
  display: flex;
  align-content: center;
  justify-content: center;
}

*,
*::before,
*::after {
  position: relative;
}
</style>
