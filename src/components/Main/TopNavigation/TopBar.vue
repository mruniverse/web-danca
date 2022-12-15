<template>
    <v-sheet class="top-bar custom-box-shadow">
        <v-row no-gutters align="center">
            <v-col class="ml-4">
                <v-row no-gutters align="center">
                    <img class="logo" width="100" src="@/assets/Logo Horizontal.svg" />
                    <v-divider vertical class="ml-8 mr-4"></v-divider>
                    <v-btn plain text>Início</v-btn>
                    <v-btn plain text>Teste</v-btn>
                </v-row>
            </v-col>
            <v-col cols="auto">
                <v-row no-gutters align="center">
                    <div class="mx-2">
                        <Notification :dense="true"></Notification>
                    </div>
                    <div class="mx-2">
                        <MyAccount :dense="true"></MyAccount>
                    </div>
                </v-row>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script setup>
import Notification from '@/components/account/Home/Notification.vue';
import MyAccount from '@/components/account/Home/MyAccountDrawer.vue';

</script>

<style lang="scss" scoped>
.logo {
    border-radius: 8px 0 0 8px;
    filter: invert(52%) sepia(30%) saturate(1050%) hue-rotate(168deg) brightness(99%) contrast(91%);
}

.top-bar {
    width: 100%;
    height: 60px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
}

.custom-box-shadow {
    box-shadow: 0px 2px 4px 1px var(--vt-c-shadows-1);
}
</style>