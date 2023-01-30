<template>
    <v-stepper v-model="step" width="100%" flat v-resize="resizeHeight">
        <v-overlay absolute :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>

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
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"> Posição inicial </v-stepper-step>
            <v-spacer></v-spacer>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="custom-card" style="overflow: auto" :style="{height: `${height}px`}" flat color="var(--v-background-base)">
                    <v-form ref="address" v-model="validAddress" lazy-validation>
                        <v-row no-gutters justify="center" class="pa-4">
                            <v-col cols="6" class="pr-4">
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Nome do ambiente" v-model="environmentStore.environment.lang.name"
                                        outlined @keyup.enter="save()" ref="editTextField" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" type="number" label="Capacidade" v-model="environmentStore.environment.capacity"
                                        outlined @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-select label="Tipo de ambiente" v-model="environmentStore.environment.environment_type_id"
                                        :items="environmentTypeStore.environmentTypes" item-text="name" item-value="id"
                                        :rules="[rules.required]" @keyup.enter="save()" outlined>
                                    </v-select>
                                </v-row>
                                <v-row no-gutters>
                                    <v-select label="Usuário responsável" v-model="environmentStore.environment.owner_id" :items="userStore.users"
                                        item-text="name" item-value="id" :rules="[rules.required]" @keyup.enter="save()" outlined>
                                    </v-select>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="País" v-model="environmentStore.environment.country" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Número" v-model="environmentStore.environment.number" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Rua" v-model="environmentStore.environment.street" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Bairro" v-model="environmentStore.environment.district" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Cidade" v-model="environmentStore.environment.city" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Estado" v-model="environmentStore.environment.state" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                <Stage v-if="step === 2"></Stage>
            </v-stepper-content>
            <v-stepper-content step="3">
                <Stage :hide-control-pannel="true" v-if="step === 3"></Stage>
            </v-stepper-content>
        </v-stepper-items>
        <v-row no-gutters class="px-8 my-4">
            <v-col>
                <v-btn v-if="step > 1" @click="back()" text> Voltar </v-btn>
                <v-btn v-else @click="$emit('closeDialog')" text> Cancelar </v-btn>
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
import { useEnvironmentTypeStore } from '@/store/Models/Environment/environmentType';
import { useStageStore } from '@/store/stage';
import { useEnvironmentStore } from '@/store/Models/Environment/environment';

export default {
    name: 'EnvironmentStepper',
    components: { Stage },
    props: {
        title: {
            type: String,
            default: 'Título'
        },
        dialog: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },

    setup(props, { emit }) {
        const notify = inject('toast');
        const dialog = computed(() => props.dialog);
        const validAddress = ref(false);
        const stageStore = useStageStore();
        const environmentStore = useEnvironmentStore();
        const userStore = useUserStore();
        const environmentTypeStore = useEnvironmentTypeStore();
        const loading = computed(() => environmentStore.loading);
        const submitText = computed(() => {
            return step.value === 3 ? 'Concluir' : 'Continuar';
        });
        const editTextField = ref(null);
        const step = ref(1);
        const rules = ref({
            required: value => !!value || 'Obrigatório.'
        });

        function back(){
            step.value--;
        }

        watch(step, (value) => {
            if(value === 1){
                emit('toggleFullScreen', false);
            } else {
                emit('toggleFullScreen', true);
            }
        });

        watch(dialog, (value) => {
            if (!value) {
                step.value = 1;
            }
        });

        function submit() {
            switch (step.value) {
                case 1:
                    if (!validAddress.value) {
                        notify.error('Preencha os campos obrigatórios');
                    } else {
                        step.value++;
                        emit('toggleFullScreen');
                    }
                    break;
                case 2:
                    step.value++;
                    break;
                case 3:
                    stageStore.setConfigsFromNodes(stageStore.getOnScreenNodes());
                    environmentStore.environment.layout_map = stageStore.layout_map;

                    if (props.edit) {
                        environmentStore.updateEnvironment(environmentStore.environment, environmentStore.environments.indexOf(environmentStore.environment)).then((response) => {
                            notify.success('Ambiente atualizado com sucesso!');
                            emit('closeDialog');
                        }).catch((error) => {
                            console.log(error);
                            notify.error(error.message);
                        });
                    } else {
                        environmentStore.addEnvironment(environmentStore.environment).then((response) => {
                            notify.success('Ambiente criado com sucesso!');
                            emit('closeDialog');
                        }).catch((error) => {
                            notify.error(error.message);
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        onMounted(async () => {
            await nextTick();
            editTextField.value.focus();
        });

        const height = ref(0);
        function resizeHeight() {
            height.value = window.innerHeight - (200*1.5);
        }

        return {
            step,
            rules,
            editTextField,
            height,
            resizeHeight,
            userStore,
            environmentTypeStore,
            submitText,
            submit,
            back,
            loading,
            validAddress,
            environmentStore
        };
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