<template>
    <v-col class="fill-height pa-0">
        <v-row no-gutters class="logo">
            <img width="200" src="@/assets/Logo Horizontal.svg" />
        </v-row>
        <v-row no-gutters class="login-sheet" justify="center">
            <router-view></router-view>
        </v-row>
    </v-col>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from '../../components/account/Login.vue';
import RegisterComponent from '../../components/account/Register.vue';
import { useLoginStore } from '../../store/loginStore';

const loginStore = useLoginStore();
</script>

<style lang="scss" scoped>
@import '@/assets/loginScreen.scss';

.teste {
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>