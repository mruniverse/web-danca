import { computed, inject, nextTick, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { useEventStore } from "../Event/event";
import { useTicketTypeStore } from "../Ticket/ticketType";

export const useBatchStore = defineStore("batchStore", () => {
  const notify = inject('toast');
  const loading = ref(false);
  const eventStore = useEventStore();
  const ticketTypeStore = useTicketTypeStore();
  const batches = ref([]);
  const properties = ref({
    name: {
      label: 'Nome',
      type: 'text',
    },
    event_id: {
      label: 'Evento',
      type: 'select',
      item: {
        value: 'id',
        text: 'lang.name',
        items: computed(() => eventStore.events),
      },
    },
    ticket_type_id: {
      label: 'Tipo de ingresso',
      type: 'select',
      item: {
        value: 'id',
        text: 'lang.name',
        items: computed(() => ticketTypeStore.ticketTypes),
      },
    },
    discount_id: {
      label: 'Cupom de desconto',
      type: 'text',
    },
    promotion_id: {
      label: 'Código da promoção',
      type: 'text',
    },
    sales_limit: {
      label: 'Limite de vendas',
      type: 'number',
    },
    minimum_per_user: {
      label: 'Mínimo por usuário',
      type: 'number',
    },
    maximum_per_user: {
      label: 'Máximo por usuário',
      type: 'number',
    },
    price: {
      label: 'Preço',
      type: 'text',
    }
  });
  const batch = ref({
    event_id: '',
    discount_id: '',
    promotion_id: '',
    ticket_type_id: '',
    sales_limit: 0,
    minimum_per_user: 0,
    maximum_per_user: 0,
    price: '',
    lang: {
      name: ''
    }
  });

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addBatch(item) {
    return whileLoading(async () => {
      return await api.post('/batches', {
        event_id: item.event_id,
        discount_id: item.discount_id,
        promotion_id: item.promotion_id,
        ticket_type_id: item.ticket_type_id,
        sales_limit: item.sales_limit,
        minimum_per_user: item.minimum_per_user,
        maximum_per_user: item.maximum_per_user,
        price: item.price,
        lang: {
          name: item.name
        }
      }).then(response => {
        batches.value = [{ id: response.data.id, ...item }, ...batches.value];
        notify.success('Lote adicionado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function updateBatch(index, item) {
    return whileLoading(async () => {
      return await api.put(`/batches/${item.id}`, {
        event_id: item.event_id,
        discount_id: item.discount_id,
        promotion_id: item.promotion_id,
        ticket_type_id: item.ticket_type_id,
        sales_limit: item.sales_limit,
        minimum_per_user: item.minimum_per_user,
        maximum_per_user: item.maximum_per_user,
        price: item.price,
        lang: {
          name: item.name
        }
      }).then(response => {
        Object.assign(batches.value[index], item);
        notify.success('Lote atualizado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function getBatches() {
    return whileLoading(async () => {
      return await api.get('/batches').then(async (response) => {
        await eventStore.getEvents();
        await ticketTypeStore.getTicketTypes();

        const data = response.data.map((item) => {
          let newItem = item;
          newItem.name = item.lang.name;
          newItem.event_name = eventStore.getEventName(item.event_id);
          newItem.ticket_type_name = ticketTypeStore.getTicketTypeName(item.ticket_type_id);
          return newItem;
        }).reverse();
        batches.value = data;
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  function deleteBatch(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/batches/${item.id}`).then(response => {
        batches.value.splice(index, 1);
        notify.success('Lote excluído com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  return { addBatch, updateBatch, getBatches, deleteBatch, batches, loading, batch, properties, whileLoading };
});
