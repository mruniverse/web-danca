<template>
    <CRUDTable 
    :loading="loading" 
    :data="batchStore.batches" 
    :headers="headers"
    :properties="batchStore.properties"
    @add-item="batchStore.addBatch"
    @delete-item-confirm="deleteBatch" 
    @update-item="batchStore.updateBatch">
    </CRUDTable>
</template>

<script setup>
import {  inject,  onBeforeMount, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import { useBatchStore } from '@/store/Models/Batch/batch.js';

const notify = inject('toast');
const batchStore = useBatchStore();
const batches = ref([]);
const loading = false;
const headers = ref([{
    text: 'Lote',
    value: 'lang.name',
    align: 'left',
    sortable: true,
    filterable: true
},{
    text: 'Evento',
    value: 'event_id',
    align: 'center',
    sortable: true,
    filterable: true
},{
    text: 'Tipo de ingresso',
    value: 'ticket_type_id',
    align: 'center',
    sortable: true,
    filterable: true
},{
    text: 'Límite de vendas',
    value: 'sales_limit',
    align: 'center',
    sortable: true,
    filterable: true
},{
    text: 'Mínimo por usuário',
    value: 'minimum_per_user',
    align: 'center',
    sortable: true,
    filterable: true
},{
    text: 'Máximo por usuário',
    value: 'maximum_per_user',
    align: 'center',
    sortable: true,
    filterable: true
}]);

onBeforeMount(async () => {
    await batchStore.getBatches().catch((error) => {
        notify.error(error.message);
    });

    batches.value = batchStore.batches;
});

function deleteBatch(item, index) {
    batchStore.deleteBatch(item, index).then(() => {
        notify.success('Lote excluído com sucesso!');
    }).catch((error) => {
        notify.error(error.message);
    });
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>