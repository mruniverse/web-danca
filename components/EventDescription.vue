<template>
    <v-card v-if="!editable">
        <v-img :style="cardTitleHeight" :src="image">
            <v-col>
                <v-row no-gutters justify="center" class="mx-n2">
                    <v-app-bar flat color="transparent">
                        <v-spacer></v-spacer>
                        <v-btn fab>
                            <v-icon @click="setDialog(false)" large>mdi-close</v-icon>
                        </v-btn>
                    </v-app-bar>
                </v-row>
                <v-row no-gutters>
                    <v-card-title :style="cardTitleHeight" class="text-h2 font-weight-bold white--text">
                        {{ title }}
                    </v-card-title>
                </v-row>
            </v-col>
        </v-img>
        <v-card-text class="text--primary subtitle-1 py-2">
            {{ description || 'Sem descrição' }}
        </v-card-text>
        <v-card-actions class="pa-4 pb-5">
            <v-btn class="px-6" x-large rounded text @click="setDialog(false)" color="error"> Cancelar </v-btn>
            <v-btn x-large rounded @click="" color="primary" class="ml-auto px-6"> Comprar </v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else class="custom-card" style="overflow: auto" :style="{ height: `${height}px` }" flat
        color="var(--v-background-base)">
        <v-sheet height="40%" color="primary" no-gutters justify="center" class="pa-4">
            <v-col>
                <v-row no-gutters justify="center">
                    <v-col cols="6" align="center" class="mx-auto">
                        <v-file-input append-icon="mdi-paperclip" prepend-icon label="Imagem" accept="image/*"
                            v-model="eventStore.event.image" class="custom-text-field" outlined>
                        </v-file-input>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-card-title :style="cardTitleHeight" class="text-h2 font-weight-bold white--text">
                        {{ title }}
                    </v-card-title>
                </v-row>
            </v-col>
        </v-sheet>
        <v-card-text class="text--primary subtitle-1 py-6">
            <v-textarea class="custom-text-field fill-height" label="Descrição do evento"
                v-model="eventStore.event.lang.description" outlined auto-grow autocomplete
                @keyup.ctrl.enter="$emit('submit')" :rules="[rules.required]">
            </v-textarea>
        </v-card-text>
    </v-card>
</template>

<script>
import { useEventStore } from '@/store/Models/Event/event.js';
import { onMounted, reactive, ref, watchEffect } from 'vue';


export default {
    name: 'EventDescription',

    props: {
        image: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
        },
        editable: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            default: ''
        }
    },

    setup(props, { emit }) {
        const eventStore = useEventStore();
        const cardTitleHeight = reactive({
            maxHeight: '40%'
        });
        const rules = ref({
            required: value => !!value || 'Obrigatório.'
        });

        const setDialog = (status) => {
            return emit('setDialog', status)
        }

        return { cardTitleHeight, setDialog, eventStore, rules }
    }
}

</script>

<style lang="scss" scoped>
.custom-card.v-sheet.v-stepper,
.v-card {
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 13px;
}

.custom-text-field.v-text-field--outlined::v-deep(fieldset) {
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