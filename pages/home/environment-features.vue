<template>
    <CRUDTable 
    title="Caracteristicas de ambientes" 
    :data="environments" 
    :headers="headers" 
    :loading="loading"
    :properties="properties"
    :loading-update="loading"
    @add-new-item="addItem" 
    @update-item="updateItem" 
    @delete-item-confirm="deleteItem">
        <v-overlay absolute :value="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTable>
</template>

<script>
export default {
  layout: "home",
}
</script>

<script setup>
import { onMounted, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import { useAxios } from "@/plugins/axios";
import { useToast } from '@/plugins/toast.js';

const api = useAxios();
const notify = useToast();
const environments = ref([]);
const loading = ref(false);
const properties = ref({
    name: {
      label: 'Característica',
      type: 'text',
    },
    observation: {
      label: 'Observação',
      type: 'text',
    },
});
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
    whileLoading(async () => {
        await getItems();
    });
});

async function whileLoading(callback) {
    loading.value = true;
    await callback();
    loading.value = false;
}

async function addItem(item) {
    await whileLoading(async () => {
        await api.post('/feature', {
            lang: {
                name: item.name,
                observation: item.observation
            }
        }).then(response => {
            environments.value = [{id: response.data.id, ...item}, ...environments.value];
            notify.success('Item adicionado com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function updateItem(itemIndex, item) {
    await whileLoading(async () => {
        await api.put(`/feature/${item.id}`, {
            lang: {
                name: item.name,
                observation: item.observation
            }
        }).then(response => {
            Object.assign(environments.value[itemIndex], item);
            notify.success('Item atualizado com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
}

async function getItems() {
    await whileLoading(async () => {
        await api.get('/feature').then(response => {
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

async function deleteItem(item, index) {
    await whileLoading(async () => {
        await api.delete(`/feature/${item.id}`).then(response => {
            environments.value.splice(index, 1);
            notify.success('Item removido com sucesso!');
        }).catch(error => {
            notify.error(error.message);
        });
    });
};
</script>