<template>
    <CRUDTableModal title="Caracteristicas de ambientes" :data="events" :headers="headers"
        :loading-update="loading" @add-new-item="addItem" @update-item="updateItem"
        @delete-item-confirm="deleteItem">
        <v-overlay absolute :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTableModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import api from '@/plugins/axios';
import { useToast } from '@/plugins/toast.js';

const notify = useToast();
const events = ref([]);
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
            events.value = [item, ...events.value];
            notify.success('Item adicionado com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function updateItem(itemIndex, item) {
    whileLoading(async () => {
        await api.put(`/feature/${item.id}`, {
            lang: {
                name: item.name,
                observation: item.observation
            }
        }).then(response => {
            Object.assign(events.value[itemIndex], item)
            notify.success('Item atualizado com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

function getItems() {
    whileLoading(async () => {
        await api.get('/feature').then(response => {
            loading.value = false;
            const data = response.data.map(item => {
                return {
                    id: item.id,
                    name: item.lang.name,
                    observation: item.lang.observation
                }
            }).reverse();
            events.value.push(...data);
        });
    });
}

function deleteItem(index, item) {
    whileLoading(async () => {
        await api.delete(`/feature/${item.id}`).then(response => {
            events.value.splice(index, 1);
            notify.success('Item removido com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
};
</script>