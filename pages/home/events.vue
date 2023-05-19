<template>
    <NuxtLayout name="navigation-container">
        <CRUDTable :loading="eventStore.loading" :data="eventStore.events" :headers="headers"
            @delete-item-confirm="eventStore.deleteEvent" @update-item="eventStore.updateEvent">
            <template v-slot:add-button>
                <v-dialog v-model="dialog" max-width="70%" content-class="custom-dialog" scrollable>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="btn-larger subtitle-2 font-weight-bold" color="primary" dark @click="addItem()"> Novo
                            evento </v-btn>
                    </template>
                    <EventStepper :edit="edit" @toggleFullScreen="fullscreen = !fullscreen" @closeDialog="closeDialog"
                        title="Novo evento">
                    </EventStepper>
                </v-dialog>
            </template>
            <template v-slot:edit="{ item }">
                <v-icon color="primary lighten-1" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            </template>
        </CRUDTable>
    </NuxtLayout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useEventStore } from '@/store/Models/Event/event.js';

const eventStore = useEventStore();
const newEvent = ref({});
const edit = ref(false);
const fullscreen = ref(false);
const dialog = ref(false);
const headers = ref([{
    text: 'Evento',
    value: 'lang.name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Organizador',
    value: 'planner_name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Ambiente',
    value: 'environment_name',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Término do evento',
    value: 'final_datetime_formated',
    align: 'center',
    sortable: true,
    filterable: true
}, {
    text: 'Término das vendas',
    value: 'final_sales_ticket_formated',
    align: 'center',
    sortable: true,
    filterable: true
}]);

onBeforeMount(() => {
    eventStore.whileLoading(async () => {
        await eventStore.getEvents();
    });
});

function addItem() {
    edit.value = false;
    dialog.value = true;
}

function editItem(item) {
    edit.value = true;
    newEvent.value = eventStore.event;
    eventStore.event = item;
    dialog.value = true;
}

function closeDialog() {
    dialog.value = false;
}
</script>

<style lang="scss" scoped>
.v-dialog__content--active:deep .v-dialog.custom-dialog {
    border-radius: 16px;
}
</style>