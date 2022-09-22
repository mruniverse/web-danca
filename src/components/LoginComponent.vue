<script setup>
import { ref } from 'vue';
import { useLoginStore } from '../stores/loginStore';

const passwordVisibility = ref('password');
const email = ref('');
const password = ref('');

const loginStore = useLoginStore();
</script>
    
<template>
    <v-sheet class="login-sheet-style d-flex align-center">
        <v-row no-gutters class="d-flex justify-center">
            <v-col cols="9">
                <v-row no-gutters justify="start">
                    <p class="login-title-text">Entre com e-mail e senha</p>
                </v-row>
                <v-row no-gutters class="mb-n5">
                    <v-text-field 
                    v-model="email"
                    append-icon="mdi-email-outline" 
                    label="E-mail" 
                    outlined>
                    </v-text-field>
                </v-row>
                <v-row no-gutters>
                    <v-text-field 
                        v-model="password"
                        label="Senha"
                        outlined 
                        :style="{'font-size': passwordVisibility ? '22px':''}"
                        :type="passwordVisibility ? 'password' : 'text'"
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
                    <a @click="loginStore.showRegister" class="px-2">Cadastre-se</a>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style scoped>
@import '../assets/loginComponent.scss';
</style>