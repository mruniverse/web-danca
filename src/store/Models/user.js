import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useUserStore = defineStore("userStore", () => {
  const loading = ref(false);
  const users = ref([{
    id: '',
    name: '',
    outer_id: ''
  }]);

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
        users.value = [item, ...users.value];
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
      });
    });
  }

  function getUsers() {
    return whileLoading(async () => {
      return await api.get('/user').then(response => {
        if (response.data.length !== 0) {
          users.value = response.data.reverse();
        }
      })
    });
  }

  function deleteUser(item, index) {
    return whileLoading(async () => {
      return api.delete(`/user/${item.id}`).then(response => {
        users.value.splice(index, 1);
      });
    });
  };

  return { addUser, updateUser, getUsers, deleteUser, users };
});
