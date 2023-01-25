<template>
    <CRUDTableModal 
        title="Tipos de ingressos" 
        :data="ticketTypeStore.ticketTypes" 
        :headers="headers" 
        @add-new-item="ticketTypeStore.addTicketType"
        @update-item="ticketTypeStore.updateTicketType" 
        @delete-item-confirm="ticketTypeStore.deleteTicketType">
        <v-overlay absolute :value="ticketTypeStore.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTableModal>
</template>

<script setup>
import { ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import { useTicketTypeStore } from '@/store/Models/Ticket/ticketType.js';

const ticketTypeStore = useTicketTypeStore();
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
}]);
</script>