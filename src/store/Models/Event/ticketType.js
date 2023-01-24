import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useTicketTypeStore = defineStore("ticketTypeStore", () => {
  const loading = ref(false);
  const ticketTypes = ref([]);
  const ticket = ref({
    lang: {
      name: '',
    }
  });

  function getTicketTypeName(id) {
    if(ticketTypes.value.length === 0) return;
    const found = ticketTypes.value.find(ticketType => ticketType.id === id);
    return found ? found.name : 'Ingresso não encontrado';
  }

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();    
    loading.value = false; 
    return newCallback;
  }

  async function addTicketType(item) {
    return whileLoading(async () => {
      return await api.post('/tickets-types', {
        lang: {
          name: item.name,
        }
      }).then(response => {
        ticketTypes.value = [item, ...ticketTypes.value];
      });
    });
  }

  async function updateTicketType(item, index) {
    return whileLoading(async () => {
      return await api.put(`/tickets-types/${item.id}`, {
        lang: {
          name: item.name,
        }
      }).then(response => {
        Object.assign(ticketTypes.value[index], item)
      });
    });
  }

  function getTicketTypes() {
    return whileLoading(async () => {
      return await api.get('/tickets-types').then(response => {
        const data = response.data.map(item => {
          return {
            id: item.id,
            name: item.lang.name,
          }
        }).reverse();
        ticketTypes.value = data;
      });
    });
  }

  function deleteTicketType(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/tickets-types/${item.id}`).then(response => {
        ticketTypes.value.splice(index, 1);
      });
    });
  }

  return { addTicketType, updateTicketType, getTicketTypes, deleteTicketType, ticketTypes, getTicketTypeName, loading };
});
