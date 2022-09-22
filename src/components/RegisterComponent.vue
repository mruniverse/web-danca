<script setup>
import { ref } from 'vue';

const passwordVisibility = ref('password');
</script>
    
<template>
    <v-sheet class="login-sheet-style">
        <v-row no-gutters justify="center" class="align-center">
            <v-col cols="9">
                <v-row no-gutters>
                    <v-col>
                        <v-btn icon>
                            <v-icon>mdi-back</v-icon> Voltar
                        </v-btn>
                    </v-col>
                    <v-col>
                        <p class="login-title-text">Cadastre-se</p>
                    </v-col>
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
                    <a class="px-2">Cadastre-se</a>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<style scoped>
@import '../assets/loginComponent.css';
</style>