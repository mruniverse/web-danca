import { inject, onBeforeMount, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useUserStore = defineStore("userStore", () => {
  const notify = inject('toast');
  const loading = ref(false);
  const users = ref([]);
  const properties = ref({
    name: {
      label: 'Nome',
      type: 'text',
    },
    outer_id: {
      label: 'ID Externo',
      type: 'text',
    }
  });

  function getUserName(id) {
    if (users.value.length === 0) return;
    const found = users.value.find(user => user.id === id);
    return found ? found.name : 'Usuário não encontrado';
  };

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addUser(item) {
    return whileLoading(async () => {
      return await api.post('/user', {
        name: item.name,
        outer_id: item.outer_id
      }).then(response => {
        users.value = [{id: response.data.id, ...item}, ...users.value];
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function updateUser(item, index) {
    return whileLoading(async () => {
      return await api.put(`/user/${item.id}`, {
        name: item.name,
        outer_id: item.outer_id
      }).then(response => {
        Object.assign(users.value[index], item)
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  function getUsers() {
    return whileLoading(async () => {
      return await api.get('/user').then(response => {
        if (response.data.length !== 0) {
          users.value = response.data.reverse();
        }
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  function deleteUser(item, index) {
    return whileLoading(async () => {
      return api.delete(`/user/${item.id}`).then(response => {
        users.value.splice(index, 1);
      }).catch(error => {
        notify.error(error.message);
      });
    });
  };

  return { addUser, updateUser, getUsers, deleteUser, users, getUserName, properties, whileLoading, loading };
});
