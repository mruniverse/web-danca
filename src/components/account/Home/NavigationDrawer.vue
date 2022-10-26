<template>
    <v-navigation-drawer height="100vh" class="custom-box-shadow" permanent :expand-on-hover="state.expanded" floating>
        <v-list>
            <v-list-item class="logo">
                <v-img max-width="180" src="@/assets/Logo Horizontal.svg"></v-img>
            </v-list-item>
        </v-list>
        <v-list nav>
            <v-list-item-group color="primary" v-model="state.selectedItem">
                <v-list-item link @click="goToPage('Workspace')">
                    <v-list-item-icon>
                        <v-icon>mdi-monitor</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Workspace</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="goToPage('Events')">
                    <v-list-item-icon>
                        <v-icon>mdi-calendar-multiselect</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Meus Eventos</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="goToPage('Places')">
                    <v-list-item-icon>
                        <v-icon>mdi-school-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Ambientes</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { reactive } from 'vue';
import { usePageStore } from '@/store/page';
import router from '@/router';
const pageStore = usePageStore();

const state = reactive({
    expanded: false,
    selectedItem: 0,
});

function goToPage(page) {
    pageStore.setPage(page);
    router.push({ name: page });
}
</script>
    
<style lang="scss" scoped>
.logo {
    height: 100px;
    justify-content: center;
    filter: invert(52%) sepia(30%) saturate(1050%) hue-rotate(168deg) brightness(99%) contrast(91%);
}

.custom-box-shadow {
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
}
</style>