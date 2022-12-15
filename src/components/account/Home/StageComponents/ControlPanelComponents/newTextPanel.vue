<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="section-title">
            <v-list-item>
                <v-row justify="center">Texto</v-row>
            </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="end">
                        <v-text-field 
                            v-model="text" 
                            label="Texto" 
                            outlined 
                            dense 
                            hide-details
                            class="custom-text-field">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn 
                            class="btn-round-left" 
                            depressed 
                            height="32" 
                            @click="fontSize > 10 ? fontSize-- : fontSize">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="fontSize++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" align="end">
                        <span class="text--secondary mr-1">Tamanho: </span>
                        <span class="primary--text"> {{ fontSize }} </span>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters justify="center">
                    <v-btn class="btn-round" color="primary" depressed required height="32"
                        @click="stageStore.generateText(text, fontSize)"> Adicionar <v-icon>mdi-plus</v-icon>
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
let text = ref('');
let fontSize = ref(18);
</script>

<style lang="scss" scoped>
@import '@/assets/expansionPanels.scss';
</style>