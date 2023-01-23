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
            <v-stepper-step :complete="step > 1" step="1"> Dados do evento </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"> Capa do evento </v-stepper-step>
            <v-spacer></v-spacer>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="custom-card" style="overflow: auto" :style="{height: `${height}px`}" 
                flat color="var(--v-background-base)">
                    <v-form ref="address" v-model="validAddress" lazy-validation>
                        <v-row no-gutters justify="center" class="pa-4">
                            <v-col cols="6" class="pr-2">
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Nome do evento" 
                                    v-model="eventStore.event.lang.name"
                                        outlined @keyup.enter="save()" ref="editTextField" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" type="number" label="Limite de vendas" 
                                    v-model="eventStore.event.maximum_sale_limit"
                                        outlined @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-select label="Tipo de evento" v-model="eventStore.event.event_type_id"
                                        :items="eventTypeStore.eventTypes" item-text="name" item-value="id"
                                        :rules="[rules.required]" @keyup.enter="save()" outlined>
                                    </v-select>
                                </v-row>
                                <v-row no-gutters justify="center" class="pl-2 text-title-custom">Data do evento</v-row>
                                <v-row no-gutters>
                                    <v-date-picker full-width v-model="datetimeRange" 
                                    :rules="[rules.required]" range></v-date-picker>
                                </v-row>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <v-row no-gutters>
                                    <v-select label="Organizador" v-model="eventStore.event.planner_id" 
                                    :items="userStore.users"
                                        item-text="name" item-value="id" :rules="[rules.required]" 
                                        @keyup.enter="save()" outlined>
                                    </v-select>
                                </v-row>
                                <v-row no-gutters>
                                    <v-select label="Local" v-model="eventStore.event.environment_id" 
                                    :items="environmentStore.environments"
                                        item-text="lang.name" item-value="id" :rules="[rules.required]" 
                                        @keyup.enter="save()" outlined>
                                    </v-select>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" label="Políticas" 
                                    v-model="eventStore.event.lang.policies" outlined
                                        @keyup.enter="save()" :rules="[rules.required]">
                                    </v-text-field>
                                </v-row>

                                <v-row no-gutters justify="center" class="pl-2 text-title-custom">Data das vendas</v-row>
                                <v-row no-gutters>
                                    <v-date-picker full-width v-model="salesRange" 
                                    :rules="[rules.required]" range></v-date-picker>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                    <EventDescription :height="height" editable :title="eventStore.event.lang.name"></EventDescription>
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
import { computed, inject, nextTick, onMounted, ref } from 'vue';
import Stage from '../StageComponents/Stage.vue';
import { useUserStore } from '@/store/Models/user';
import { useEventTypeStore } from '@/store/Models/eventType';
import { useStageStore } from '@/store/stage';
import { useEventStore } from '@/store/Models/event';
import { useEnvironmentStore } from '@/store/Models/environment';
import EventDescription from '@/components/Main/EventDescription.vue';

export default {
    name: 'EventStepper',
    components: { Stage, EventDescription },
    props: {
        title: {
            type: String,
            default: 'Título'
        },
    },

    setup(props, { emit }) {
        const notify = inject('toast');
        const datetimeRange = ref([]);
        const salesRange = ref([]);
        const validAddress = ref(false);
        const stageStore = useStageStore();
        const eventStore = useEventStore();
        const userStore = useUserStore();
        const environmentStore = useEnvironmentStore();
        const eventTypeStore = useEventTypeStore();
        const loading = false;
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
            emit('toggleFullScreen');
        }

        function submit() {
            switch (step.value) {
                case 1:
                    step.value++;
                    break;
                case 2:
                    break;
                case 3:
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
            environmentStore,
            eventTypeStore,
            submitText,
            submit,
            back,
            loading,
            validAddress,
            eventStore,
            datetimeRange,
            salesRange,
        };
    }
}
</script>

<style lang="scss" scoped>
.text-title-custom {
    font-weight: 700;
    font-size: 24px;
    color: var(--v-secondary-base);
}

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