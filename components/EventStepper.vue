<template>
    <v-stepper v-model="step" width="100%" flat v-resize="resizeHeight">
        <v-overlay absolute :value="eventStore.loading">
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
            <v-stepper-step :complete="step > 1" step="1"> Dados </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"> Datas (evento) </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"> Datas (vendas) </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 4" step="4"> Capa </v-stepper-step>
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
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card class="custom-card" style="overflow: auto" :style="{height: `${height}px`}" 
                flat color="var(--v-background-base)">
                    <v-form ref="address" v-model="validAddress" lazy-validation>
                        <v-row no-gutters justify="center" class="text-title-custom py-4">Datas e horários do evento</v-row>
                        <v-row no-gutters justify="center" class="pa-4">
                            <v-col cols="6" class="pr-2">
                                <v-row no-gutters>
                                    <v-date-picker full-width v-model="datetimeRange" 
                                    :rules="[rules.required]" range></v-date-picker>
                                </v-row>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" outlined v-model="initial_datetime" label="Início"
                                        append-icon="mdi-calendar" prepend-icon>
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" outlined v-model="final_datetime" label="Fim"
                                        append-icon="mdi-calendar" prepend-icon>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card class="custom-card" style="overflow: auto" :style="{height: `${height}px`}" 
                flat color="var(--v-background-base)">
                    <v-form ref="address" v-model="validAddress" lazy-validation>
                        <v-row no-gutters justify="center" class="text-title-custom py-4">Datas e horários das vendas</v-row>
                        <v-row no-gutters justify="center" class="pa-4">
                            <v-col cols="6" class="pr-2">
                                <v-row no-gutters>
                                    <v-date-picker full-width v-model="salesRange" 
                                    :rules="[rules.required]" range></v-date-picker>
                                </v-row>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" outlined v-model="initial_sales_ticket" label="Início"
                                        append-icon="mdi-calendar" prepend-icon>
                                    </v-text-field>
                                </v-row>
                                <v-row no-gutters>
                                    <v-text-field class="custom-text-field" outlined v-model="final_sales_ticket" label="Fim"
                                        append-icon="mdi-calendar" prepend-icon>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-stepper-content>
            <v-stepper-content step="4">
                    <EventDescription v-if="step === 4" @submit="submit()" :height="height" editable :title="eventStore.event.lang.name"></EventDescription>
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
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/store/Models/user';
import { useEventTypeStore } from '@/store/Models/Event/eventType';
import { useStageStore } from '@/store/stage';
import { useEventStore } from '@/store/Models/Event/event';
import { useEnvironmentStore } from '@/store/Models/Environment/environment';
import { useToast } from '@/plugins/toast.js';

export default {
    name: 'EventStepper',
    props: {
        title: {
            type: String,
            default: 'Título'
        },
        edit: {
            type: Boolean,
            default: false
        },
    },

    setup(props, { emit }) {
        const notify = useToast();
        const datetimeRange = ref([]);
        const salesRange = ref([]);
        const validAddress = ref(false);
        const stageStore = useStageStore();
        const eventStore = useEventStore();
        const userStore = useUserStore();
        const environmentStore = useEnvironmentStore();
        const eventTypeStore = useEventTypeStore();
        const initial_datetime = computed({
            get() {
                if (datetimeRange.value[0]) {
                    const date = new Date(datetimeRange.value[0]);
                    eventStore.event.initial_datetime = date.toISOString().replace('Z', '').replace('T', ' ');
                    return date.toDateString();
                }
            },
        });
        const final_datetime = computed({
            get() {
                if (datetimeRange.value[1]) {
                    const date = new Date(datetimeRange.value[1]);
                    eventStore.event.final_datetime = date.toISOString().replace('Z', '').replace('T', ' ');
                    return date.toDateString();
                }
            },
        });
        const initial_sales_ticket = computed({
            get() {
                if (salesRange.value[0]) {
                    const date = new Date(salesRange.value[0]);
                    eventStore.event.initial_sales_ticket = date.toISOString().replace('Z', '').replace('T', ' ');
                    return date.toDateString();
                }
            },
        });
        const final_sales_ticket = computed({
            get() {
                if (salesRange.value[1]) {
                    const date = new Date(salesRange.value[1]);
                    eventStore.event.final_sales_ticket = date.toISOString().replace('Z', '').replace('T', ' ');
                    return date.toDateString();
                }
            },
        });
        const submitText = computed(() => {
            return step.value === 4 ? 'Concluir' : 'Continuar';
        });
        const editTextField = ref(null);
        const step = ref(1);
        const rules = ref({
            required: value => !!value || 'Obrigatório.'
        });

        function back(){
            step.value--;
        }

        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };

        async function submit() {
            switch (step.value) {
                case 1:
                    step.value++;
                    break;
                case 2:
                    step.value++;
                    break;
                case 3:
                    step.value++;
                    break;
                case 4:
                    // let image = eventStore.event.image;
                    // await getBase64(image).then((data) => {
                    //     eventStore.event.image = data;
                    // });
                    
                    eventStore.event.image = 'Indisponível'
                    if (props.edit) {
                        eventStore.updateEvent(eventStore.event).then(() => {
                            notify.success('Evento atualizado com sucesso!');
                            emit('closeDialog');
                        }).catch(() => {
                            notify.error('Erro ao atualizar evento!');
                        });
                        break;
                    } else {
                        eventStore.addEvent(eventStore.event).then(() => {
                            notify.success('Evento criado com sucesso!');
                            emit('closeDialog');
                        }).catch(() => {
                            notify.error('Erro ao criar evento!');
                        });
                    }
                    break;
                default:
                    break;
            }
        }

        onMounted(async () => {
            datetimeRange.value = [eventStore.event.initial_datetime, eventStore.event.final_datetime];
            salesRange.value = [eventStore.event.initial_sales_ticket, eventStore.event.final_sales_ticket];
            if(eventStore.event.image === ''){
                eventStore.event.image = null;
            }
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
            validAddress,
            eventStore,
            datetimeRange,
            salesRange,
            initial_datetime,
            final_datetime,
            initial_sales_ticket,
            final_sales_ticket
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