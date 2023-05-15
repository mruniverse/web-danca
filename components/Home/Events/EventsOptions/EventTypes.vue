<template>
    <CRUDTable 
        title="Tipos de eventos" 
        :data="eventTypeStore.eventTypes"
        :headers="headers"
        :properties="eventTypeStore.properties"
        :loading="eventTypeStore.loading"
        @add-new-item="newEventType"
        @update-item="updateEventType" 
        @delete-item-confirm="deleteEventType">
    </CRUDTable>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import { useEventTypeStore } from '@/store/Models/Event/eventType.js';

const notify = inject('toast');
const eventTypeStore = useEventTypeStore();
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