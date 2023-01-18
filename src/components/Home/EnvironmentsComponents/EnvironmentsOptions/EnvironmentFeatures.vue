<template>
    <CRUDTableModal 
        title="Caracteristicas de ambientes"
        :data="environments" 
        :headers="headers" 
        :loading-update="loadingUpdate"
        @add-new-item="addItem"
        @update-item="updateItem"
        @delete-item-confirm="deleteItem">
    </CRUDTableModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import api from '@/plugins/axios';

const environments = ref([]);
const loadingUpdate = ref(false);
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
}, {
    text: 'Ações',
    align: 'end',
    value: 'actions',
    sortable: false
},
]);

onMounted(() => {
    getFeatures();
});


async function addItem(item) {
    loadingUpdate.value = true;
    await api.post('/feature', {
        lang: {
            name: item.name,
            observation: item.observation
        }
    }).then(response => {
        environments.value.push(item)
    });
    loadingUpdate.value = false;
}

async function updateItem(itemIndex, item) {
    loadingUpdate.value = true;
    await api.put(`/feature/${item.id}`, {
        lang: {
            name: item.name,
            observation: item.observation
        }
    }).then(response => {
        Object.assign(environments.value[itemIndex], item)
    });
    loadingUpdate.value = false;
}

function getFeatures() {
    api.get('/feature').then(response => {
        loadingUpdate.value = false;
        const data = response.data.map(item => {
            return {
                id: item.id,
                name: item.lang.name,
                observation: item.lang.observation
            }
        });
        loadingUpdate.value = false;

        environments.value.push(...data);
    });
}

function deleteItem() {
    api.delete(`/feature/${editedItem.value.id}`).then(response => {
        environments.value.splice(editedIndex.value, 1);
    });
    closeDelete()
};
</script>