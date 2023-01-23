import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useEnvironmentTypeStore = defineStore("environmentTypeStore", () => {
  const loading = ref(false);
  const environmentTypes = ref([]);

  function getEnvironmentTypeName(id) {
    if(environmentTypes.value.length === 0) return;
    const found = environmentTypes.value.find(environmentType => environmentType.id === id);
    return found ? found.name : 'Usuário não encontrado';
  }

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addEnvironmentType(item) {
    return whileLoading(async () => {
      return await api.post('/environment-types', {
        lang: {
          name: item.name
        }
      }).then(response => {
        environmentTypes.value = [item, ...environmentTypes.value];
      });
    });
  }

  async function updateEnvironmentType(item, index) {
    return whileLoading(async () => {
      return await api.put(`/environment-types/${item.id}`, {
        lang: {
          name: item.name
        }
      }).then(response => {
        Object.assign(environmentTypes.value[itemIndex], item)
      });
    });
  }

  function getEnvironmentTypes() {
    return whileLoading(async () => {
      return await api.get('/environment-types').then(response => {
        const data = response.data.map(item => {
          return {
            id: item.id,
            name: item.lang.name
          }
        }).reverse();
        environmentTypes.value = data;
      });
    });
  }

  function deleteEnvironmentType(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/environment-types/${item.id}`).then(response => {
        environmentTypes.value.splice(index, 1);
      });
    });
  }

  return { addEnvironmentType, updateEnvironmentType, getEnvironmentTypes, deleteEnvironmentType, environmentTypes, getEnvironmentTypeName };
});