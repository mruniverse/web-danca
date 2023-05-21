<template>
    <CRUDTable :loading="batchStore.loading" :data="batchStore.batches" :headers="headers" :properties="batchStore.properties"
        @add-new-item="batchStore.addBatch" @delete-item-confirm="batchStore.deleteBatch" @update-item="batchStore.updateBatch">
    </CRUDTable>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import { useBatchStore } from '@/store/Models/Batch/batch.js';

const batchStore = useBatchStore();
const headers = ref([{
    text: 'Lote',
    value: 'lang.name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Evento',
    value: 'event_name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Tipo de ingresso',
    value: 'ticket_type_name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Límite de vendas',
    value: 'sales_limit',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Mínimo por usuário',
    value: 'minimum_per_user',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Máximo por usuário',
    value: 'maximum_per_user',
    align: 'center',
    sortable: true,
    filterable: true
}]);

onBeforeMount(() => {
    batchStore.whileLoading(async () => {
        await batchStore.getBatches();
    });
});
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>