<template>
    <v-row no-gutters align="center">
        <v-menu content-class="menu-style" transition="slide-y-transition" bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-list class="pa-0" rounded width="280" color="transparent">
                    <v-list-item class="pa-0" v-bind="attrs" v-on="on" link>
                        <v-btn width="40" height="60" class="button" color="primary">
                            <v-icon size="28" color="var(--color-background)">mdi-account-outline</v-icon>
                        </v-btn>
                        <v-list-item-content class="ml-4">
                            <v-list-item-title class="title">{{loginStore.username}}</v-list-item-title>
                            <v-list-item-subtitle>{{loginStore.email}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </template>
            <v-list shaped>
                <v-list-item-group color="primary">
                    <v-list-item link>
                        <v-list-item-title>Minha conta</v-list-item-title>
                        <v-icon>mdi-account-outline</v-icon>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title>Configurações</v-list-item-title>
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-list-item>
                    <v-list-item link @click="logout()">
                        <v-list-item-title>Sair</v-list-item-title>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </v-row>
</template>

<script setup>
import router from '@/router';
import { useLoginStore } from '@/store/loginStore';
import { reactive } from 'vue';

const loginStore = useLoginStore();
const state = reactive({
    notifications: 3
});

function logout() {
    router.push({ name: 'Login' });
}
</script>

<style lang="scss" scoped>
.button {
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 20px;
}

.menu-style {
    margin-top: 4px;
    border-radius: 0 10px 10px 10px;
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
}
</style>