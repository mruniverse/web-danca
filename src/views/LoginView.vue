<script setup>
import { ref } from 'vue';
import Login from '../components/LoginComponent.vue';
import Register from '../components/RegisterComponent.vue';
import { useLoginStore } from '../stores/loginStore';
import RegisterComponent from '../components/RegisterComponent.vue';

const loginStore = useLoginStore();
</script>

<template>
    <v-container class="d-flex align-center justify-center">
        <!-- <img class="logo" src="@/assets/Logo Horizontal.svg" /> -->
        <div v-if="loginStore.login">
            <Login />
        </div>
        <div v-if="loginStore.register">
            <RegisterComponent />
        </div>
    </v-container>
</template>

<style scoped>
@import '../assets/loginScreen.css';
</style>