<template>
    <CRUDTable 
    :loading="loading" 
    :data="data" 
    :headers="headers"
    :properties="userStore.properties" 
    @delete-item-confirm="deleteItem" 
    @update-item="updateItem"
    @add-new-item="addItem">
    </CRUDTable>
</template>

<script setup>
import CRUDTable from '@/components/CRUDTable.vue';
import { inject, onMounted, ref } from 'vue';
import api from '@/plugins/axios';
import { useUserStore } from '@/store/Models/user';

const notify = inject('toast');
const loading = ref(false);
const userStore = useUserStore();
const headers = ref([{
    text: 'Nome',
    value: 'name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Token',
    value: 'outer_id',
    align: 'center',
    sortable: true,
    filterable: true
}]);

const data = ref([]);

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