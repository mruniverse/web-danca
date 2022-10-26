<template>
    <v-navigation-drawer :width="300" class="custom-box-shadow" :mini-variant="stageStore.expanded" permanent>
        <v-list>
            <v-list-item-group color="primary" v-model="state.selectedItem">
                <v-list-item link @click="stageStore.togglePanel()">
                    <v-list-item-icon>
                        <v-icon>mdi-menu</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Minimizar</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
            <v-list-item v-if="!stageStore.expanded" class="sectionTitle">
                <v-row justify="center">Assentos</v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="state.rows--">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="state.rows++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align="end">Linhas: {{ state.rows }}</v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="state.columns--">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="state.columns++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align="end">Colunas: {{ state.columns }}</v-col>
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
                        @click="stageStore.generateSeats(state.rows, state.columns)"> 
                        Adicionar <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
            <v-list-item v-if="!stageStore.expanded" class="sectionTitle">
                <v-row justify="center">Palco</v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="podium.rows--">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="podium.rows++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align="end">Linhas: {{ podium.rows }}</v-col>
                </v-row>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon v-if="stageStore.expanded"></v-list-item-icon>
                <v-row no-gutters align="center">
                    <v-col align="start">
                        <v-btn class="btn-round-left" depressed height="32" @click="podium.columns--">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn class="btn-round-right" depressed height="32" @click="podium.columns++">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col align="end">Colunas: {{ podium.columns }}</v-col>
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
                        @click="stageStore.generatePodiums(podium.rows, podium.columns)"> 
                        Adicionar <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useStageStore } from '@/store/stage';

const stageStore = useStageStore();
const state = reactive({
    selectedItem: 0,
    toggleNone: null,
    columns: 1,
    rows: 1
});
const podium = reactive({
    columns: 1,
    rows: 1
});

watch(() => state.columns, (value) => {
    if (value < 1) state.columns = 1;
});

watch(() => state.rows, (value) => {
    if (value < 1) state.rows = 1;
});

watch(() => podium.columns, (value) => {
    if (value < 1) podium.columns = 1;
});

watch(() => podium.rows, (value) => {
    if (value < 1) podium.rows = 1;
});
</script>
    
<style lang="scss" scoped>
.custom-box-shadow {
    box-shadow: 0px 4px 4px 4px rgba(59, 125, 182, 0.068);
    border-radius: 0 13px 13px 0;
}

.btn-round {
    border-radius: 13px;
}
.btn-round-left {
    border-radius: 13px 0 0 13px;
}

.btn-round-right {
    border-radius: 0 13px 13px 0;
}

.sectionTitle{
    margin-top: 8px;
    background-color: var(--v-background-base);
}
</style>