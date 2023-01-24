import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useEventStore } from "../Event/event";
import { useTicketTypeStore } from "../Event/ticketType";

export const useBatchStore = defineStore("batchStore", () => {
  const loading = ref(false);
  const eventStore = useEventStore();
  const ticketTypeStore = useTicketTypeStore();
  const batches = ref([]);
  const properties = ref({
    event_id: {
      label: 'Evento',
      type: 'select',
      item: {
        value: 'id',
        text: 'lang.name',
        items: computed(() => eventStore.events),
      },
    },
    discount_id: {
      label: 'Cumpom de desconto',
      type: 'text',
    },
    promotion_id: {
      label: 'Código da promoção',
      type: 'text',
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
    },
    name: {
      label: 'Nome',
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

  onMounted(async () => {
    await whileLoading(async () => {
      await eventStore.getEvents();
      await ticketTypeStore.getTicketTypes();
    });
  });

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addBatch(item) {
    return whileLoading(async () => {
      return await api.post('/batches', item).then(response => {
        batches.value = [{
          ...item,
        }, ...batches.value];
      });
    });
  }

  async function updateBatch(item, index) {
    return whileLoading(async () => {
      return await api.put(`/batches/${item.id}`, item).then(response => {
        Object.assign(batches.value[index], item)
      });
    });
  }

  function getBatches() {
    return whileLoading(async () => {
      return await api.get('/batches').then(response => {
        const data = response.data.map(item => {
          return {
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
          }
        }).reverse();
        batches.value = data;
      });
    });
  }

  function deleteBatch(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/batches/${item.id}`).then(response => {
        batches.value.splice(index, 1);
      });
    });
  }

  return { addBatch, updateBatch, getBatches, deleteBatch, batches, loading, batch, properties };
});
