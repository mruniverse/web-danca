<template>
    <CRUDTable 
    :loading="loading" 
    :data="events" 
    :headers="headers" 
    @delete-item-confirm="deleteEvent" 
    @update-item="eventStore.updateEvent">
        <template v-slot:options>
            <EventOptions></EventOptions>
        </template>
        <template v-slot:add-button>
            <v-dialog 
            v-model="dialog" max-width="70%" 
            content-class="custom-dialog" scrollable>
                <template v-slot:activator="{on, attrs}">
                    <v-btn 
                    class="btn-larger subtitle-2 font-weight-bold" 
                    color="primary" dark @click="addItem()"> 
                        Novo evento 
                    </v-btn>
                </template>
                <EventStepper 
                @toggleFullScreen="fullscreen = !fullscreen" 
                @closeDialog="closeDialog" 
                title="Novo evento">
                </EventStepper>
            </v-dialog>
        </template>
        <template v-slot:edit="{item}">
            <v-icon color="primary lighten-1" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
    </CRUDTable>
</template>

<script setup>
import { computed, inject,  onBeforeMount, ref } from 'vue';
import CRUDTable from '@/components/CRUDTable.vue';
import EventOptions from '@/components/Home/Events/EventsOptions/EventOptions.vue';
import EventStepper from '@/components/Home/Events/EventStepper.vue';
import { useEventStore } from '@/store/Models/event';
import { useUserStore } from '@/store/Models/user';
import { useEventTypeStore } from '@/store/Models/eventType';
import { useStageStore } from '@/store/stage';

const notify = inject('toast');
const userStore = useUserStore();
const eventTypeStore = useEventTypeStore();
const eventStore = useEventStore();
const stageStore = useStageStore();
const newEvent = ref({});   
const events = ref([]);
const loading = false;
const fullscreen = ref(false);
const dialog = ref(false);
const headers = ref([{
    text: 'Evento',
    value: 'name',
    align: 'center',
    sortable: true,
    filterable: true
},{
    text: 'Organizador',
    value: 'planner_id',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Ambiente',
    value: 'environment_id',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Data de término',
    value: 'final_datetime',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Término das vendas',
    value: 'final_sales_ticket',
    align: 'center',
    sortable: true,
    filterable: true
}]);

function addItem() {
    dialog.value = true;
}

function editItem(item) {
    newEvent.value = eventStore.event;
    eventStore.event = item;
    dialog.value = true;
}

onBeforeMount(async () => {
    await userStore.getUsers().catch((error) => {
        notify.error(error.message);
    });
    await eventTypeStore.getEventTypes().catch((error) => {
        notify.error(error.message);
    });
    await eventStore.getEvents().catch((error) => {
        notify.error(error.message);
    });

    events.value = eventStore.events;
});

function deleteEvent(item, index) {
    eventStore.deleteEvent(item, index).then(() => {
        notify.success('Ambiente excluído com sucesso!');
    }).catch((error) => {
        notify.error(error.message);
    });
}

function closeDialog() {
    dialog.value = false;
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active::v-deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>