import { computed, onBeforeMount, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUserStore } from "../user";
import { useEnvironmentTypeStore } from "../Environment/environmentType";

export const useEnvironmentStore = defineStore("environmentStore", () => {
  const loading = ref(false);
  const environments = ref([]);
  const environment = ref();
  const userStore = useUserStore();
  const environmentTypeStore = useEnvironmentTypeStore();

  function getUserName(owner_id){
    return userStore.getUserName(owner_id);
  }

  function getEnvironmentName(environment_id){
    if(environments.value.length === 0) return;
    const found = environments.value.find(environment => environment.id === environment_id);
    return found ? found.lang.name : 'Ambiente não encontrado';
  }

  function getEnvironmentTypeName(environment_type_id){
    return environmentTypeStore.getEnvironmentTypeName(environment_type_id);
  }

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addEnvironment(item) {
    return whileLoading(async () => {
      return await api.post('/environment', {
        lang: {
          name: item.lang.name,
          description: 'Sem descrição',
        },
        environment_type_id: item.environment_type_id,
        owner_id: item.owner_id,
        country: item.country,
        number: item.number,
        street: item.street,
        district: item.district,
        city: item.city,
        state: item.state,
        capacity: item.capacity,
        layout_map: JSON.stringify(item.layout_map),
      }).then(response => {
        environments.value = [{
          ...item,
          user_name: getUserName(item.owner_id),
          environment_type_name: getEnvironmentTypeName(item.environment_type_id),
        }, ...environments.value];
      });
    });
  }

  async function updateEnvironment(item, index) {
    return whileLoading(async () => {
      return await api.put(`/environment/${item.id}`, {
        lang: {
          name: item.lang.name,
        },
        environment_type_id: item.environment_type_id,
        owner_id: item.owner_id,
        country: item.country,
        number: item.number,
        street: item.street,
        district: item.district,
        city: item.city,
        state: item.state,
        capacity: item.capacity,
        layout_map: JSON.stringify(item.layout_map),
      }).then(response => {
        Object.assign(environments.value[index], item)
      });
    });
  }

  function getEnvironments() {
    return whileLoading(async () => {
      return await api.get('/environment').then(response => {
        const data = response.data.map(item => {
          return {
            id: item.id,
            lang: {
              name: item.lang.name,
              description: item.lang.description,
            },
            environment_type_id: item.environment_type_id,
            owner_id: item.owner_id,
            user_name: getUserName(item.owner_id),
            environment_type_name: getEnvironmentTypeName(item.environment_type_id),
            country: item.country,
            number: item.number,
            street: item.street,
            district: item.district,
            city: item.city,
            state: item.state,
            capacity: item.capacity,
            layout_map: JSON.parse(item.layout_map),
          }
        }).reverse();
        environments.value = data;
      });
    });
  }

  function deleteEnvironment(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/environment/${item.id}`).then(response => {
        environments.value.splice(index, 1);
      });
    });
  }

  return { addEnvironment, updateEnvironment, getEnvironments, deleteEnvironment, environments, loading, environment, getEnvironmentName };
});
