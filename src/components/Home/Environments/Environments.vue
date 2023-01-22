<template>
    <CRUDTable 
    :loading="loading" 
    :data="environments" 
    :headers="headers" 
    @delete-item-confirm="environmentStore.deleteEnvironment" 
    @update-item="environmentStore.updateEnvironment">
        <template v-slot:options>
            <EnvironmentOptions></EnvironmentOptions>
        </template>
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
                    color="primary" dark v-on="on" v-bind="attrs"> 
                        Novo ambiente 
                    </v-btn>
                </template>
                <NewEnvironment 
                @toggleFullScreen="fullscreen = !fullscreen" 
                @closeDialog="closeDialog" 
                title="Novo ambiente">
                </NewEnvironment>
            </v-dialog>
        </template>
    </CRUDTable>
</template>

<script setup>
import { computed, inject, onBeforeMount, onMounted, ref, watch } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import EnvironmentOptions from '@/components/Home/Environments/EnvironmentsOptions/EnvironmentOptions.vue';
import NewEnvironment from './NewEnvironment.vue';
import { useEnvironmentStore } from '@/store/Models/environment';
import { useUserStore } from '@/store/Models/user';
import { useEnvironmentTypeStore } from '@/store/Models/environmentType';

const notify = inject('toast');
const userStore = useUserStore();
const environmentTypeStore = useEnvironmentTypeStore();
const environmentStore = useEnvironmentStore();
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

onBeforeMount(async () => {
    await userStore.getUsers().catch((error) => {
        notify.error(error.message);
    });
    await environmentTypeStore.getEnvironmentTypes().catch((error) => {
        notify.error(error.message);
    });
    await environmentStore.getEnvironments().then(() => {
        environments.value = environmentStore.environments;
    }).catch((error) => {
        notify.error(error.message);
    });
});

function closeDialog() {
    dialog.value = false;
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>