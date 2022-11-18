<template>
    <v-row no-gutters class="fill-height">
        <v-col cols="auto">
            <NavigationDrawer />
        </v-col>
        <v-col>
            <v-row no-gutters v-if="showMenuBar()">
                <v-col cols="auto" class="pa-4">
                    <div class="pl-2 text-title-custom"> 
                        {{getCurrentPage()}}
                    </div>
                </v-col>
                <v-col class="pa-4">
                    <v-row no-gutters justify="end">
                        <Notification />
                        <div class="mx-2"></div>
                        <MyAccount />
                    </v-row>
                </v-col>
            </v-row>
            <v-row no-gutters justify="center" class="px-4 py-4 fill-height">
                <router-view></router-view>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import {reactive} from 'vue';
import NavigationDrawer from '@/components/account/Home/NavigationDrawer.vue';
import Notification from '@/components/account/Home/Notification.vue';
import MyAccount from '@/components/account/Home/MyAccount.vue';
import router from '@/router';

const state = reactive({
    pages: [
        {page: 'Workspace', text: 'Workspace'},
        {page: 'Events', text: 'Meus Eventos'},
        {page: 'Places', text: 'Meus Ambientes'},
    ],
});

function showMenuBar() {
    return getCurrentPage() !== 'NewEnvironment';
};

function getCurrentPage() {
    const currentPage = state.pages.find((page) => page.page === router.currentRoute.name);
    return currentPage ? currentPage.text : router.currentRoute.name;
}
</script>

<style lang="scss" scoped>
.text-title-custom {
    font-weight: 700;
    font-size: 28px;
    color: var(--v-secondary-base);
}

.v-btn:not(.v-btn--round).v-size--default{
    height: 42px;
    box-shadow: 0 0 0 0;
    border-radius: 13px;
}
</style>
