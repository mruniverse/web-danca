<script setup>
import { ref } from 'vue';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import { useLoginStore } from '../stores/loginStore';

const loginStore = useLoginStore();
</script>

<template>
    <v-container class="d-flex align-center justify-center">
        <!-- <img class="logo" src="@/assets/Logo Horizontal.svg" /> -->
        <div v-if="loginStore.login">
            <LoginComponent />
        </div>
        <div v-if="loginStore.register">
            <RegisterComponent />
        </div>
    </v-container>
</template>

<style scoped>
@import '../assets/loginScreen.css';
</style>