<template>
    <v-dialog v-model="newEnvironmentStatus" :fullscreen="isExtraSmall" :content-class="customModalClass" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-list-item-title v-bind="attrs" v-on="on">Novo tipo de ambiente</v-list-item-title>
        </template>
        <v-card>
            <v-card-title class="pa-0">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Novo tipo de ambiente</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="setDialog(false)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card-title>
            <v-card-text class="text--primary subtitle-1 py-2">
                <v-text-field outlined></v-text-field>
            </v-card-text>
            <v-card-actions class="pa-4 pb-5">
                <v-btn class="px-6" x-large rounded text @click="setDialog(false)" color="error"> Cancelar </v-btn>
                <v-btn x-large rounded @click="" color="primary" class="ml-auto px-6"> Criar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    name: "NewEnvironmentType",
    setup() {
        const newEnvironmentStatus = ref(false);

        function setDialog(status) {
            newEnvironmentStatus.value = status;
        };

        const customModalClass = computed({
            get() {
                return isExtraSmall.value ? '' : 'custom-dialog';
            }
        });

        const isExtraSmall = computed({
            get() {
                return this.$vuetify.breakpoint.width <= 600 ? true : false;
            }
        });

        return { newEnvironmentStatus, setDialog, customModalClass, isExtraSmall };
    }
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
    max-width: 50%;
    max-height: 50%;
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

</style>