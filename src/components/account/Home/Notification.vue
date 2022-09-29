<template>
    <v-menu content-class="menu-style" transition="slide-y-transition" left offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-badge overlap bottom color="error" :content="getNotificationNumber">
                <v-btn v-bind="attrs" v-on="on" width="40" height="60" class="button" color="white">
                    <v-icon size="28" color="accent">mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>
        <v-list shaped>
            <v-list-item-group color="primary">
                <v-list-item link disabled>
                    <v-list-item-title>Você não tem notificações</v-list-item-title>
                    <v-icon class="ml-2">mdi-emoticon-happy-outline</v-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script setup>
import { computed, reactive } from 'vue';

const state = reactive({
    notifications: 0
});

const getNotificationNumber = computed(() => {
    return state.notifications >= 100 ? '99+' : state.notifications;
});
</script>

<style lang="scss" scoped>
.button {
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 20px;
}

.menu-style {
    margin-top: 10px;
    border-radius: 10px 0 10px 10px;
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
}
</style>