import { inject, onBeforeMount, onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useTicketTypeStore = defineStore("ticketTypeStore", () => {
  const notify = inject('toast');
  const loading = ref(false);
  const ticketTypes = ref([]);
  const properties = ref({
    name: {
      label: 'Nome',
      type: 'text',
    },
  });
  const ticket = ref({
    lang: {
      name: '',
    }
  });

  function getTicketTypeName(id) {
    if (ticketTypes.value.length === 0) return;
    const found = ticketTypes.value.find(ticketType => ticketType.id === id);
    return found ? found.lang.name : 'Ingresso não encontrado';
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
        notify.success('Ingresso adicionado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function updateTicketType(index, item) {
    return whileLoading(async () => {
      return await api.put(`/tickets-types/${item.id}`, {
        lang: {
          name: item.name,
        }
      }).then(response => {
        Object.assign(ticketTypes.value[index], item);
        notify.success('Ingresso atualizado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
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
            lang: {
              name: item.lang.name,
            }
          }
        }).reverse();
        ticketTypes.value = data;
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  function deleteTicketType(index, item) {
    return whileLoading(async () => {
      return await api.delete(`/tickets-types/${item.id}`).then(response => {
        ticketTypes.value.splice(index, 1);
        notify.success('Ingresso deletado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  return { addTicketType, updateTicketType, getTicketTypes, deleteTicketType, ticketTypes, getTicketTypeName, ticket, loading, properties, whileLoading };
});
