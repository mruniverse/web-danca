<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="section-title">
            <v-list-item>
                <v-row justify="center">Identificadores</v-row>
            </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="my-2">
            <div v-for="(serie, index) in stageStore.series" :key="index">
                <v-list-item>
                    <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                    <v-row no-gutters align="center">
                        <v-col cols="4" align="center" class="pr-2">
                            <v-text-field v-model="serie.prefix" label="Prefixo" outlined dense hide-details
                                class="custom-text-field">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" align="center">
                            <v-text-field v-model="serie.from" type="number" label="De" outlined dense hide-details
                                class="custom-text-field">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" align="center" class="pl-2">
                            <v-text-field v-model="serie.to" type="number" label="Até" outlined dense hide-details
                                class="custom-text-field">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-list-item>
                <v-divider class="mt-4 mb-2"></v-divider>
            </div>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col cols="8" align="center">
                        <v-btn class="btn-round-left" depressed height="32" @click="stageStore.series.length > 1 ? stageStore.series.pop() : series">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="stageStore.series.push({ prefix: '', from: null, to: null})">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="4" align="center">
                        <v-btn class="btn-round" color="primary" depressed required height="32"
                            @click="updateSeats()">
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup>
import { useStageStore } from '@/store/stage';
import { onUpdated, ref } from 'vue';

const stageStore = useStageStore();
const rules = ref({
    required: value => !!value || 'Obrigatório.'
});
async function updateSeats() {
    if (stageStore.series.length > 0 && stageStore.series[0].from != null && stageStore.series[0].to != null) {
        removeUnusedSeries();
        stageStore.updateSeatsNames(stageStore.series);
        stageStore.generateSeatsTexts();
        stageStore.syncElements();
    }
}

function removeUnusedSeries() {
    stageStore.series.forEach(element => {
        if (!element.from || !element.to || !element.prefix) {
            stageStore.series.splice(stageStore.series.indexOf(element), 1);
        }
    });
}

onUpdated(() => {
    stageStore.series.forEach(element => {
        element.from < 0 ? element.from = 0 : element.from;
        element.to < 0 ? element.to = 0 : element.to;
    });
});
</script>

<style lang="scss" scoped>
@import '@/assets/expansionPanels.scss';
</style>