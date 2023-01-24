<template>
    <CRUDTableModal 
        title="Tipos de eventos" 
        :data="eventTypeStore.eventTypes" 
        :headers="headers" 
        @add-new-item="newEventType"
        @update-item="updateEventType" 
        @delete-item-confirm="deleteEventType">
        <v-overlay absolute :value="eventTypeStore.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </CRUDTableModal>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';
import CRUDTableModal from '@/components/CRUDTableModal.vue';
import api from '@/plugins/axios';
import { useEventStore } from '@/store/Models/Event/event.js';
import { useEventTypeStore } from '@/store/Models/Event/eventType.js';

const notify = inject('toast');
const eventTypeStore = useEventTypeStore();
const events = ref([]);
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
},{
    text: 'Observações',
    value: 'observation',
    sortable: true,
    align: 'center',
}]);

onMounted(() => {
    if(eventTypeStore.eventTypes.length === 0) {
        eventTypeStore.getEventTypes();
    }
});

function newEventType(eventType) {
    eventTypeStore.addEventType(eventType).catch((error) => {
        notify.error(error.message);
    });
}

function updateEventType(eventType, index) {
    eventTypeStore.updateEventType(eventType, index).catch((error) => {
        notify.error(error.message);
    })
}

function deleteEventType(eventType, index) {
    eventTypeStore.deleteEventType(eventType, index).catch((error) => {
        notify.error(error.message);
    })
}
</script>