<script setup>
import { ref } from 'vue';
import {useLoginStore} from '../stores/loginStore';

const passwordVisibility = ref('password');
const loginStore = useLoginStore();
</script>
    
<template>
    <v-sheet rounded elevation="4">
        <v-row no-gutters class="d-flex justify-center">
            <v-col cols="9">
                <v-row no-gutters justify="center">
                    <p class="login-title-text">Entre com e-mail e senha</p>
                </v-row>
                <v-row no-gutters class="mb-n5">
                    <p>E-mail</p>
                </v-row>
                <v-row no-gutters>
                    <v-text-field append-icon="mdi-email-outline" placeholder="E-mail" outlined>
                    </v-text-field>
                </v-row>
                <v-row no-gutters class="my-n5">
                    <p>Senha</p>
                </v-row>
                <v-row no-gutters>
                    <v-text-field placeholder="Senha" outlined :type="passwordVisibility ? 'password' : 'text'"
                        :append-icon="passwordVisibility ? 'mdi-lock-off-outline' : 'mdi-lock-outline'"
                        @click:append="() => (passwordVisibility = !passwordVisibility)">
                    </v-text-field>
                </v-row>
                <v-row no-gutters class="mt-n5">
                    <v-col align-self="end">
                        <a>Esqueci a senha</a>
                    </v-col>
                    <v-col align="end">
                        <v-btn style="border-radius: 13px;" elevation="0" color="#2887DA" dark> Entrar </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-5">
                    <v-divider></v-divider>
                </v-row>
                <v-row no-gutters justify="center" class="mt-10 mb-n5">
                    <p class="have-you-registered-text">É novo no Web Dança?</p>
                    <a @click="loginStore.goToRegister" class="px-2">Cadastre-se</a>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style scoped>
@import '../assets/loginComponent.css';
</style>