<template>
    <v-navigation-drawer class="custom-box-shadow" permanent :expand-on-hover="state.expanded" floating>
        <v-list>
            <v-list-item class="logo">
                <v-img max-width="180" src="@/assets/Logo Horizontal.svg"></v-img>
            </v-list-item>
        </v-list>
        <v-list nav>
            <v-list-item-group v-model="itemGroup" color="primary">
                <div v-for="item in items" :key="item.title">
                    <v-list-group v-if="item.items.length > 0" :value="item.active" @click="pageStore.setPage(item.route)"
                        :prepend-icon="item.icon" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item v-for="child in item.items" :key="child.title">
                            <v-list-item-content @click="pageStore.setPage(child.route)">
                                <v-list-item-title v-text="child.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item v-else link @click="pageStore.setPage(item.route)">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </div>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, watchEffect } from 'vue';
import { usePageStore } from '@/store/page';
import router from '@/router';

const pageStore = usePageStore();
const homeRoutes = pageStore.getRoutesNames('Home');
const itemGroup = ref([]);
const items = [{
    active: ref(false),
    title: 'Meus Eventos',
    route: 'Events',
    icon: 'mdi-calendar-multiselect',
    items: [
        {title: 'Tipos de eventos', route: 'EventTypes', icon: 'mdi-calendar-star'},
    ]
}, {
    active: ref(false),
    title: 'Lotes',
    route: 'Batches',
    icon: 'mdi-human-queue',
    items: [
        {title: 'Tipos de ingressos', route: 'TicketTypes', icon: 'mdi-ticket-confirmation'}
    ]
}, {
    active: ref(false),
    title: 'Ambientes',
    route: 'Environments',
    icon: 'mdi-school-outline',
    items: [
        {title: 'Tipos', route: 'EnvironmentTypes', icon: 'mdi-school'},
        {title: 'Características', route: 'EnvironmentFeatures', icon: 'mdi-cog-outline'}
    ]
}, {
    active: ref(false),
    title: 'Usuários',
    route: 'Users',
    icon: 'mdi-account-multiple-outline',
    items: []
}];
const state = reactive({
    expanded: false,
});

onMounted(() => {
    fetchSelectedPage();
});

watchEffect(async () => {
    await nextTick();
    fetchSelectedPage();
});

function fetchSelectedPage() {
    switch (router.currentRoute.name) {
        case 'Events':
        case 'EventTypes':
            itemGroup.value = 0;
            items[0].active.value = true;
            break;
        case 'Batches':
        case 'TicketTypes':
            itemGroup.value = 1;
            items[1].active.value = true;
            break;
        case 'Environments':
        case 'EnvironmentTypes':
        case 'EnvironmentFeatures':
            itemGroup.value = 2;
            items[2].active.value = true;
            break;
        default:
            itemGroup.value = homeRoutes.indexOf(router.currentRoute.name) - 2;
            break;
    }
}
</script>
    
<style lang="scss" scoped>
.logo {
    height: 100px;
    justify-content: center;
    filter: invert(52%) sepia(30%) saturate(1050%) hue-rotate(168deg) brightness(99%) contrast(91%);
}

.custom-box-shadow {
    max-width: 260px;
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
}
</style>