<template>
    <v-stepper class="custom-card" v-model="step" width="100%" flat>
        <v-stepper-header class="custom-card-header">
            <v-spacer></v-spacer>
            <v-stepper-step :complete="step > 1" step="1"> Dados do ambiente </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"> Criação do ambiente </v-stepper-step>
            <v-spacer></v-spacer>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="custom-card" flat color="var(--v-background-base)" height="60vh">
                    <v-col>
                        <v-row no-gutters>
                            <v-text-field label="Pesquisar localização" outlined></v-text-field>
                        </v-row>
                        <v-row no-gutters justify="center">
                            <v-card width="100%" height="200px" flat color="grey"></v-card>
                        </v-row>
                        <v-row no-gutters>
                            <v-text-field label="Tipo de ambiente" outlined></v-text-field>
                        </v-row>
                    </v-col>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                <Stage v-if="step===2"></Stage>
            </v-stepper-content>
        </v-stepper-items>
        <v-row no-gutters class="pa-4">
            <v-col>
                <v-btn v-if="step>1" @click="step--" text> Voltar </v-btn>
                <v-btn v-else @click="$router.go(-1)" text> Cancelar </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn class="btn-larger" color="primary" @click="step++"> Continuar </v-btn>
            </v-col>
        </v-row>
    </v-stepper>
</template>

<script setup>
import { ref } from 'vue';
import Stage from '../StageComponents/Stage.vue';
var step = ref(1);
var address = {
    streetName: ref(''),
    streetNumber: ref(''),
    streetBox: ref(''),
    zipCode: ref(''),
    city: ref('')
};

function populateAutocompletedAddress(autocompletedAddress) {
    // Here you assign the autocompletedAddress to your address data.
    this.address = { ...this.address, ...autocompletedAddress };
}
</script>

<style lang="scss" scoped>
.custom-card, .v-sheet.v-stepper, .v-card {
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 13px;
}

.custom-card-header {
    box-shadow: 0 0 0 0;
    border-radius: 0;
}

.btn-larger.v-btn:not(.v-btn--round).v-size--default{
    height: 40px;
}

.v-stepper__content{
    height: auto;
}

.v-stepper__header{
    height: 48px;
}
.v-text-field.v-input{
    margin-top: 14px;
}
.v-text-field--outlined::v-deep(fieldset) {
    background: var(--v-textField-base);
    border: 1px solid #ECECF7;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    border-radius: 13px;
    transition: border 0.1s linear 0s;
}

.v-input--is-focused.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #2886DA;
    box-shadow: 0px 4px 4px var(--vt-c-shadows-1);
    transition: border 0.1s linear 0s;
}

.error--text.v-text-field--outlined::v-deep(fieldset) {
    border: 2px solid #ff5252;
}
</style>