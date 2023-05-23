<template>
    <CRUDTable 
    :loading="userStore.loading" 
    :data="userStore.users" 
    :headers="headers"
    :properties="userStore.properties" 
    @delete-item-confirm="userStore.deleteUser" 
    @update-item="userStore.updateUser"
    @add-new-item="userStore.addUser">
    </CRUDTable>
</template>

<script>
export default {
  layout: "home",
}
</script>

<script setup>
import CRUDTable from '@/components/CRUDTable.vue';
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/store/Models/user';

const userStore = useUserStore();
const headers = ref([{
    text: 'Nome',
    value: 'name',
    align: 'left',
    sortable: true,
    filterable: true
}, {
    text: 'Token',
    value: 'outer_id',
    align: 'center',
    sortable: true,
    filterable: true
}]);

onBeforeMount(() => {
    userStore.whileLoading(async () => {
        await userStore.getUsers();
    });
});
</script>