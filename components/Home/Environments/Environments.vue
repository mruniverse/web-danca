<template>
    <CRUDTable 
    :loading="loading" 
    :data="environments" 
    :headers="headers" 
    @delete-item-confirm="deleteEnvironment" 
    @update-item="environmentStore.updateEnvironment">
        <template v-slot:add-button>
            <v-dialog 
            v-model="dialog"
            max-width="70%" 
            :fullscreen="fullscreen" 
            :content-class="fullscreen ? '' : 'custom-dialog'" 
            scrollable>
                <template v-slot:activator="{on, attrs}">
                    <v-btn 
                    class="btn-larger subtitle-2 font-weight-bold" 
                    color="primary" dark @click="addItem()"> 
                        Novo ambiente 
                    </v-btn>
                </template>
                <EnvironmentStepper 
                :dialog="dialog"
                :edit="edit"
                @toggleFullScreen="(value) => fullscreen = value" 
                @closeDialog="closeDialog" 
                title="Novo ambiente">
                </EnvironmentStepper>
            </v-dialog>
        </template>
        <template v-slot:edit="{item}">
            <v-icon color="primary lighten-1" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
    </CRUDTable>
</template>

<script setup>
import { computed, inject, onBeforeMount, ref, watch } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import EnvironmentStepper from './EnvironmentStepper.vue';
import { useEnvironmentStore } from '@/store/Models/Environment/environment';
import { useUserStore } from '@/store/Models/user';
import { useEnvironmentTypeStore } from '@/store/Models/Environment/environmentType';
import { useStageStore } from '@/store/stage';

const notify = inject('toast');
const edit = ref(false);
const userStore = useUserStore();
const environmentTypeStore = useEnvironmentTypeStore();
const environmentStore = useEnvironmentStore();
const stageStore = useStageStore();
const newEnvironment = ref({
    lang: {
        name: '',
        description: '',
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
    layout_map: null,
});
const environments = ref([]);
const loading = computed(() => environmentStore.loading);
const fullscreen = ref(false);
const dialog = ref(false);
const headers = ref([{
    text: 'Nome',
    value: 'lang.name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Descrição',
    value: 'lang.description',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Tipo de ambiente',
    value: 'environment_type_name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Usuário',
    value: 'user_name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Capacidade',
    value: 'capacity',
    align: 'center',
    sortable: true,
    filterable: true
}]);

function addItem() {
    environmentStore.environment = newEnvironment.value;
    dialog.value = true;
}

function editItem(item) {
    newEnvironment.value = environmentStore.environment;
    environmentStore.environment = item;
    stageStore.parseLayoutMap(item.layout_map);
    edit.value = true;
    dialog.value = true;
}

onBeforeMount(async () => {
    await userStore.getUsers().catch((error) => {
        notify.error(error.message);
    });
    await environmentTypeStore.getEnvironmentTypes().catch((error) => {
        notify.error(error.message);
    });
    await environmentStore.getEnvironments().catch((error) => {
        notify.error(error.message);
    });

    environments.value = environmentStore.environments;
});

function deleteEnvironment(item, index) {
    environmentStore.deleteEnvironment(item, index).then(() => {
        notify.success('Ambiente excluído com sucesso!');
    }).catch((error) => {
        notify.error(error.message);
    });
}

function closeDialog() {
    dialog.value = false;
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active:deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>