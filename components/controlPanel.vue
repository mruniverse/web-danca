<template>
    <v-navigation-drawer width="300" class="custom-box-shadow" floating :mini-variant="stageStore.expanded" permanent>
        <v-list>
            <v-list-item color="primary" v-model="state.selectedItem">
                <v-list-item link @click="stageStore.togglePanel()">
                    <v-list-item-icon>
                        <v-icon>mdi-menu</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Minimizar</v-list-item-title>
                </v-list-item>
            </v-list-item>
            <v-expansion-panels v-if="!stageStore.expanded" v-model="state.expandedPanels" multiple flat tile>
                <NewSeatPanel></NewSeatPanel>
                <SeatsNames></SeatsNames>
                <NewPodiumPanel></NewPodiumPanel>
                <NewTextPanel></NewTextPanel>
            </v-expansion-panels>
        </v-list>
    </v-navigation-drawer>  
</template>

<script setup>
import { reactive } from 'vue';
import { useStageStore } from '@/store/stage';
import NewSeatPanel from './newSeatPanel.vue';
import NewPodiumPanel from './newPodiumPanel.vue';
import NewTextPanel from './newTextPanel.vue';
import SeatsNames from './seatsNames.vue';

const stageStore = useStageStore();
const state = reactive({
    toggleNone: null,
    expandedPanels: [0, 1],
});
</script>
    
<style lang="scss" scoped>
@import '@/assets/expansionPanels.scss';
</style>