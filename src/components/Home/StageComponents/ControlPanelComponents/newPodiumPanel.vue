<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="section-title">
            <v-list-item>
                <v-row justify="center">Palco</v-row>
            </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="end">
                        <v-select v-model="type" :items="types" outlined></v-select>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters justify="center">
                    <v-btn class="btn-round" color="primary" depressed height="32"
                        @click="stageStore.generatePodiums(type)"> Adicionar <v-icon>mdi-plus
                        </v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup>
import { useStageStore } from '@/store/stage';
import { ref } from 'vue';
const stageStore = useStageStore();
let type = ref('square');
let types = ref([
    { text: 'Quadrado', value: 'square' },
    // { text: 'Circulo', value: 'circle' },
]);
</script>

<style lang="scss" scoped>
@import '@/assets/expansionPanels.scss';
</style>