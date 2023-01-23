<template>
    <CRUDTableModal 
        title="Tipos de eventos" 
        :data="events" 
        :headers="headers" 
        @add-new-item="addItem"
        @update-item="updateItem" 
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

const loading = ref(false);
const notify = inject('toast');
const events = ref([]);
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
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
        await api.post('/event-types', {
            lang: {
                name: item.name
            }
        }).then(response => {
            events.value = [item, ...events.value];
        });
    })
}

async function updateItem(itemIndex, item) {
    whileLoading(async () => {
        await api.put(`/event-types/${item.id}`, {
            lang: {
                name: item.name
            }
        }).then(response => {
            Object.assign(events.value[itemIndex], item)
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function getItems() {
    whileLoading(async () => {
        await api.get('/event-types').then(response => {
            const data = response.data.map(item => {
                return {
                    id: item.id,
                    name: item.lang.name
                }
            }).reverse();
            events.value.push(...data);
        });
    });
}

async function deleteItem(item, index) {
    whileLoading(async () => {
        await api.delete(`/event-types/${item.id}`).then(response => {
            events.value.splice(index, 1);
        }).catch(error => {
            notify.error(error.message);
        });
    });
};
</script>