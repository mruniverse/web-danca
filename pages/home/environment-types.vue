<template>
    <CRUDTable
        title="Tipos de ambientes" 
        :data="environmentTypeStore.environmentTypes" 
        :headers="headers"
        :properties="environmentTypeStore.properties"
        :loading="environmentTypeStore.loading"
        @add-new-item="environmentTypeStore.addEnvironmentType"
        @update-item="environmentTypeStore.updateEnvironmentType" 
        @delete-item-confirm="environmentTypeStore.deleteEnvironmentType">
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
import { useEnvironmentTypeStore } from '@/store/Models/Environment/environmentType';

const environmentTypeStore = useEnvironmentTypeStore();
const headers = ref([{
    text: 'Tipo',
    align: 'start',
    sortable: true,
    value: 'name',
}]);

onBeforeMount(() => {
    environmentTypeStore.whileLoading(async () => {
        await environmentTypeStore.getEnvironmentTypes();
    });
});

</script>