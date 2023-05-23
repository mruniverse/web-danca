<template>
    <CRUDTable
        title="Tipos de ingressos" 
        :data="ticketTypeStore.ticketTypes" 
        :headers="headers"
        :loading="ticketTypeStore.loading"
        :properties="ticketTypeStore.properties"
        @add-new-item="ticketTypeStore.addTicketType"
        @update-item="ticketTypeStore.updateTicketType" 
        @delete-item-confirm="ticketTypeStore.deleteTicketType">
    </CRUDTable>
</template>

<script>
export default {
  layout: "home",
}
</script>

<script setup>
import { onBeforeMount, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import { useTicketTypeStore } from '@/store/Models/Ticket/ticketType.js';

onBeforeMount(() => {
    ticketTypeStore.whileLoading(async () => {
        await ticketTypeStore.getTicketTypes();
    });
});

const ticketTypeStore = useTicketTypeStore();
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
}]);
</script>