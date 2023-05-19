<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="section-title">
            <v-list-item>
                <v-row justify="center">Assentos</v-row>
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
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="rows > 1 ? rows-- : rows">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="rows++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" align="end">
                        <span class="text--secondary mr-1">Vertical: </span>
                        <span class="primary--text"> {{ rows }} </span>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="columns > 1 ? columns-- : columns">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="columns++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" align="end">
                        <span class="text--secondary mr-1">Horizontal: </span>
                        <span class="primary--text"> {{ columns }} </span>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters justify="center">
                    <v-btn 
                        class="btn-round" 
                        color="primary" 
                        depressed 
                        height="32"
                        @click="stageStore.generateSeats(rows, columns, type)"> 
                        Adicionar <v-icon>mdi-plus</v-icon>
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
let rows = ref(1);
let columns = ref(1);
let type = ref('default');
let types = ref([
    { text: 'Padrão', value: 'default' },
    { text: 'Cadeirante', value: 'wheelchair' },
    { text: 'Obeso', value: 'special' },
]);
</script>

<style lang="scss" scoped>
@import '@/assets/expansionPanels.scss';
</style>