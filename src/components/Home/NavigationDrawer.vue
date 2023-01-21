<template>
    <v-navigation-drawer class="custom-box-shadow" permanent :expand-on-hover="state.expanded" floating>
        <v-list>
            <v-list-item class="logo">
                <v-img max-width="180" src="@/assets/Logo Horizontal.svg"></v-img>
            </v-list-item>
        </v-list>
        <v-list nav>
            <v-list-item-group color="primary" v-model="homeRoutes">
                <v-list-item link @click="pageStore.setPage('Settings')">
                    <v-list-item-icon>
                        <v-icon>mdi-account-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Minha conta</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="pageStore.setPage('Events')">
                    <v-list-item-icon>
                        <v-icon>mdi-calendar-multiselect</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Meus Eventos</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="pageStore.setPage('Places')">
                    <v-list-item-icon>
                        <v-icon>mdi-school-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Ambientes</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="pageStore.setPage('Users')">
                    <v-list-item-icon>
                        <v-icon>mdi-account-multiple-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Usuários</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { onMounted, reactive, watchEffect } from 'vue';
import { usePageStore } from '@/store/page';

const pageStore = usePageStore();
const homeRoutes = pageStore.getRoutesNames('Home');
const state = reactive({
    expanded: false,
    selectedItem: 0,
});

onMounted(() => {
    fetchSelectedPage();
});

watchEffect(async () => {
    fetchSelectedPage();
});

function fetchSelectedPage() {
    const currentRoute = pageStore.getPage();
    state.selectedItem = homeRoutes.indexOf(currentRoute); 
}
</script>
    
<style lang="scss" scoped>
.logo {
    height: 100px;
    justify-content: center;
    filter: invert(52%) sepia(30%) saturate(1050%) hue-rotate(168deg) brightness(99%) contrast(91%);
}

.custom-box-shadow {
    max-width: 220px;
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
}
</style>