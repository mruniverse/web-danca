<template>
    <v-stepper v-model="step" width="100%" flat v-resize="resizeHeight">
        <v-toolbar dark dense color="primary">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="$emit('closeDialog')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-stepper-header class="custom-card-header">
            <v-spacer></v-spacer>
            <v-stepper-step :complete="step > 1" step="1"> Dados do ambiente </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"> Criação do ambiente </v-stepper-step>
            <v-spacer></v-spacer>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="custom-card" style="overflow: auto" :style="{height: `${height}px`}" flat color="var(--v-background-base)">
                    <v-row no-gutters justify="center" class="pa-4">
                        <v-col cols="6" class="pr-4">
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Nome do ambiente" v-model="environment.lang.name" outlined
                                    @keyup.enter="save()" ref="editTextField" :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" type="number" label="Capacidade" v-model="environment.capacity" outlined
                                    @keyup.enter="save()" :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-select
                                    label="Tipo de ambiente" 
                                    v-model="environment.environment_type_id" 
                                    :items="environmentTypeStore.environmentTypes" 
                                    item-text="name"
                                    item-value="id"
                                    :rules="[rules.required]" 
                                    @keyup.enter="save()"
                                    outlined>
                                </v-select>
                            </v-row>
                            <v-row no-gutters>
                                <v-select
                                    label="Usuário responsável" 
                                    v-model="environment.owner_id" 
                                    :items="userStore.users"
                                    item-text="name"
                                    item-value="id"
                                    :rules="[rules.required]" 
                                    @keyup.enter="save()"
                                    outlined>
                                </v-select>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="País" v-model="environment.country" outlined @keyup.enter="save()"
                                    :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Número" v-model="environment.number" outlined
                                    @keyup.enter="save()" :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Rua" v-model="environment.street" outlined @keyup.enter="save()"
                                    :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Bairro" v-model="environment.district" outlined
                                    @keyup.enter="save()" :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Cidade" v-model="environment.city" outlined @keyup.enter="save()"
                                    :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters>
                                <v-text-field class="custom-text-field" label="Estado" v-model="environment.state" outlined @keyup.enter="save()"
                                    :rules="[rules.required]">
                                </v-text-field>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                <Stage v-if="step === 2"></Stage>
            </v-stepper-content>
        </v-stepper-items>
        <v-row no-gutters class="px-8">
            <v-col>
                <v-btn v-if="step > 1" @click="step--" text> Voltar </v-btn>
                <v-btn v-else @click="$router.go(-1)" text> Cancelar </v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn class="btn-larger" color="primary" @click="submit()"> {{ submitText }} </v-btn>
            </v-col>
        </v-row>
    </v-stepper>
</template>

<script>
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import Stage from '../StageComponents/Stage.vue';
import { useUserStore } from '@/store/Models/user';
import { useEnvironmentTypeStore } from '@/store/Models/environmentTypes';

export default {
    name: 'NewEnvironment',
    components: { Stage },
    props: {
        title: {
            type: String,
            default: 'Título'
        }
    },

    setup() {
        const notify = inject('toast');
        const userStore = useUserStore();
        const environmentTypeStore = useEnvironmentTypeStore();
        const submitText = computed(() => {
            return step.value === 2 ? 'Concluir' : 'Continuar';
        });
        const editTextField = ref(null);
        const step = ref(1);
        const rules = ref({
            required: value => !!value || 'Obrigatório.'
        })
        const environment = ref({
            lang: {
                name: '',
            },
            environment_type_id: null,
            owner_id: null,
            country: '',
            number: '',
            street: '',
            district: '',
            city: '',
            state: '',
            capacity: '',
            layout_map: ''
        });

        function submit() {
            if (step.value === 1) {
                step.value++;
            } else {
                console.log(environment.value);
            }
        }

        onMounted(async () => {
            userStore.getUsers().catch((error) => {
                notify.error(error.message);
            });

            environmentTypeStore.getEnvironmentTypes().catch((error) => {
                notify.error(error.message);
            });

            await nextTick();
            editTextField.value.focus();
        });

        const height = ref(0);
        function resizeHeight() {
            height.value = window.innerHeight - 232;
        }

        return { step, environment, rules, editTextField, height, resizeHeight, userStore, environmentTypeStore, submitText };
    }
}
</script>

<style lang="scss" scoped>

.v-input.v-text-field--outlined.v-select::v-deep{
    margin-top: 14px;
    margin-bottom: 13px;
}

.custom-card.v-sheet.v-stepper,
.v-card {
    box-shadow: 0px 4px 4px rgba(59, 124, 182, 0.03);
    border-radius: 13px;
}

.v-sheet.v-stepper {
    border-radius: 0;
}

.custom-card-header {
    box-shadow: 0 0 0 0;
    border-radius: 0;
}

.btn-larger.v-btn:not(.v-btn--round).v-size--default {
    height: 40px;
}

.v-stepper__content {
    height: auto;
}

.v-stepper__header {
    height: 48px;
}

.v-text-field.v-input {
    margin-top: 14px;
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