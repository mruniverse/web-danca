<template>
    <CRUDTableModal title="Caracteristicas de ambientes" :data="environments" :headers="headers"
        :loading-update="loading" @add-new-item="addItem" @update-item="updateItem"
        @delete-item-confirm="deleteItem">
        <v-overlay absolute :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTableModal>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import api from '@/plugins/axios';

const notify = inject('toast');
const environments = ref([]);
const loading = ref(false);
const headers = ref([{
    text: 'Característica',
    align: 'start',
    sortable: true,
    value: 'name',
}, {
    text: 'Observação',
    align: 'center',
    sortable: true,
    value: 'observation',
}]);

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
        await api.post('/feature', {
            lang: {
                name: item.name,
                observation: item.observation
            }
        }).then(response => {
            environments.value = [item, ...environments.value];
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function updateItem(item, itemIndex) {
    whileLoading(async () => {
        await api.put(`/feature/${item.id}`, {
            lang: {
                name: item.name,
                observation: item.observation
            }
        }).then(response => {
            Object.assign(environments.value[itemIndex], item)
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

function getItems() {
    whileLoading(async () => {
        api.get('/feature').then(response => {
            loading.value = false;
            const data = response.data.map(item => {
                return {
                    id: item.id,
                    name: item.lang.name,
                    observation: item.lang.observation
                }
            }).reverse();
            environments.value.push(...data);
        });
    });
}

function deleteItem(item, index) {
    whileLoading(async () => {
        api.delete(`/feature/${item.id}`).then(response => {
            environments.value.splice(index, 1);
        }).catch(error => {
            notify.error(error.message);
        });
    });
};
</script>