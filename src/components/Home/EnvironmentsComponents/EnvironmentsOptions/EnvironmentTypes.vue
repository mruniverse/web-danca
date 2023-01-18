<template>
    <CRUDTableModal 
        title="Tipos de ambientes"
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
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
}, {
    text: 'Ações',
    align: 'end',
    value: 'actions',
    sortable: false
},
]);

onMounted(() => {
    getEnvironments();
});


async function addItem(item) {
    loadingUpdate.value = true;
    await api.post('/environment-types', {
        lang: {
            name: item.name
        }
    }).then(response => {
        environments.value.push(item)
    });
    loadingUpdate.value = false;
}

async function updateItem(itemIndex, item) {
    loadingUpdate.value = true;
    await api.put(`/environment-types/${item.id}`, {
        lang: {
            name: item.name
        }
    }).then(response => {
        Object.assign(environments.value[itemIndex], item)
    });
    loadingUpdate.value = false;
}

function getEnvironments() {
    api.get('/environment-types').then(response => {
        loadingUpdate.value = false;
        const data = response.data.map(item => {
            return {
                id: item.id,
                name: item.lang.name
            }
        });
        loadingUpdate.value = false;

        environments.value.push(...data);
    });
}

function deleteItem() {
    api.delete(`/environment-types/${editedItem.value.id}`).then(response => {
        environments.value.splice(editedIndex.value, 1);
    });
    closeDelete()
};
</script>