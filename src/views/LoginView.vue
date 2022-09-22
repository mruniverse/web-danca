<script setup>
import { ref } from 'vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import { useLoginStore } from '../stores/loginStore';

const loginStore = useLoginStore();
</script>

<template>
    <v-col class="fill-height pa-0">
        <v-row no-gutters class="logo">
            <img width="200" src="@/assets/Logo Horizontal.svg" />
        </v-row>
        <v-row no-gutters class="login-sheet" justify="center">
            <div v-if="loginStore.login">
                <LoginComponent />
            </div>
            <div v-if="loginStore.register">
                <RegisterComponent />
            </div>
        </v-row>
    </v-col>
</template>

<style scoped>
@import '../assets/loginScreen.css';

.teste {
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>