<template>
    <CRUDTable 
    :loading="loading" 
    :data="data" 
    :headers="headers" 
    @delete-item-confirm="deleteItem" 
    @update-item="updateItem"
    @add-new-item="addItem">
        <template v-slot:options>
            <EnvironmentOptions></EnvironmentOptions>
        </template>
        <template v-slot:add-button>
            <v-dialog 
            v-model="dialog" 
            fullscreen scrollable>
                <template v-slot:activator="{on, attrs}">
                    <v-btn 
                    class="btn-larger subtitle-2 font-weight-bold" 
                    color="primary" dark v-on="on" v-bind="attrs"> 
                        Novo ambiente 
                    </v-btn>
                </template>
                <NewEnvironment @closeDialog="closeDialog" title="Novo ambiente"></NewEnvironment>
            </v-dialog>
        </template>
    </CRUDTable>
</template>

<script setup>
import api from '@/plugins/axios';
import { inject, onMounted, ref, watch, computed } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import EnvironmentOptions from '@/components/Home/Environments/EnvironmentsOptions/EnvironmentOptions.vue';
import NewEnvironment from './NewEnvironment.vue';

const notify = inject('toast');
const loading = ref(false);
const dialog = ref(false);
const data = ref([{
    name: 'Ambiente 1',
    environment_type_id: '1',
    owner_id: '1',
    country: 'Brasil',
    number: '123',
    street: 'Rua 1',
    district: 'Bairro 1',
    city: 'Cidade 1',
    state: 'Estado 1',
    capacity: '100',
    layout_map: 'json'
}]);
const headers = ref([{
    text: 'Nome',
    value: 'name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Tipo de ambiente',
    value: 'environment_type_id',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Usuário',
    value: 'owner_id',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'País',
    value: 'country',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Número',
    value: 'number',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Rua',
    value: 'street',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Bairro',
    value: 'district',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Cidade',
    value: 'city',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Estado',
    value: 'state',
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


function closeDialog() {
    dialog.value = false;
}

watch(dialog, (val) => {
    val || closeDialog();
});

const isExtraSmall = computed({
    get() {
        return this.$vuetify.breakpoint.width <= 600 ? true : false;
    }
});

onMounted(() => {
    getItems();
});

async function whileLoading(callback) {
    loading.value = true;
    await callback();
    loading.value = false;
}

async function addItem(item) {
    whileLoading(async () => {
        await api.post('/user', {
            name: item.name,
            outer_id: item.outer_id
        }).then(response => {
            data.value = [item, ...data.value];
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function updateItem(itemIndex, item) {
    whileLoading(async () => {
        await api.put(`/user/${item.id}`, {
            name: item.name,
            outer_id: item.outer_id
        }).then(response => {
            Object.assign(data.value[itemIndex], item)
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

function getItems() {
    whileLoading(async () => {
        await api.get('/user').then(response => {
            if (response.data.length !== 0) {
                data.value.push(...response.data.reverse());
            }
        }).catch(error => {
            notify.error(error.message);
        })
    });
}

function deleteItem(item, index) {
    whileLoading(async () => {
        api.delete(`/user/${item.id}`).then(response => {
            data.value.splice(index, 1);
        }).catch(error => {
            notify.error(error.message);
        });
    });
};
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>