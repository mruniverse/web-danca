<template>
    <CRUDTableModal 
        title="Tipos de ingressos" 
        :data="ticketTypeStore.ticketTypes" 
        :headers="headers" 
        @add-new-item="newTicketType"
        @update-item="updateTicketType" 
        @delete-item-confirm="deleteTicketType">
        <v-overlay absolute :value="ticketTypeStore.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTableModal>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import { useTicketTypeStore } from '@/store/Models/Event/ticketType.js';

const notify = inject('toast');
const ticketTypeStore = useTicketTypeStore();
const tickets = ref([]);
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
}]);

onMounted(() => {
    if(ticketTypeStore.ticketTypes.length === 0) {
        ticketTypeStore.getTicketTypes();
    }
});

function newTicketType(ticketType) {
    ticketTypeStore.addTicketType(ticketType).catch((error) => {
        notify.error(error.message);
    });
}

function updateTicketType(ticketType, index) {
    ticketTypeStore.updateTicketType(ticketType, index).catch((error) => {
        notify.error(error.message);
    })
}

function deleteTicketType(ticketType, index) {
    ticketTypeStore.deleteTicketType(ticketType, index).catch((error) => {
        notify.error(error.message);
    })
}
</script>