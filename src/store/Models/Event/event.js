import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUserStore } from "../user";
import { useEventTypeStore } from "@/store/Models/Event/eventType";
import { useEnvironmentStore } from "../Environment/environment";

export const useEventStore = defineStore("eventStore", () => {
  const userStore = useUserStore();
  const eventTypeStore = useEventTypeStore();
  const environmentStore = useEnvironmentStore();
  const loading = ref(false);
  const events = ref([]);
  const event = ref({
    planner_id: "",
    event_type_id: "",
    environment_id: "",
    initial_datetime: null,
    final_datetime: null,
    initial_sales_ticket: null,
    final_sales_ticket: null,
    maximum_sale_limit: 0,
    image: null,
    lang: {
        name: "",
        description: "",
        policies: ""
    }
  });

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addEvent(item) {
    return whileLoading(async () => {
      return await api.post('/events', item).then(response => {
        events.value = [{
          ...item,
          planner_name: userStore.getUserName(item.planner_id),
          environment_name: environmentStore.getEnvironmentName(item.environment_id),
        }, ...events.value];
      });
    });
  }

  async function updateEvent(item, index) {
    return whileLoading(async () => {
      return await api.put(`/events/${item.id}`, item).then(response => {
        Object.assign(events.value[index], item)
      });
    });
  }

  function getEvents() {
    return whileLoading(async () => {
      return await api.get('/events').then(response => {
        const data = response.data.map(item => {
          let initial_datetime = new Date(item.initial_datetime);
          let final_datetime = new Date(item.final_datetime);
          let initial_sales_ticket = new Date(item.initial_sales_ticket);
          let final_sales_ticket = new Date(item.final_sales_ticket);
          return {
            planner_id: item.planner_id,
            event_type_id: item.event_type_id,
            environment_id: item.environment_id,
            initial_datetime: initial_datetime.toISOString(),
            final_datetime: final_datetime.toISOString(),
            initial_sales_ticket: initial_sales_ticket.toISOString(),
            final_sales_ticket: final_sales_ticket.toISOString(),
            maximum_sale_limit: item.maximum_sale_limit,
            image: '',
            lang: {
                name: item.lang.name,
                description: item.lang.description,
                policies: item.lang.policies
            },
            title: item.lang.name,
            final_datetime_formated: final_datetime.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            final_sales_ticket_formated: final_sales_ticket.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            planner_name: userStore.getUserName(item.planner_id),
            environment_name: environmentStore.getEnvironmentName(item.environment_id),
          }
        }).reverse();
        events.value = data;
      });
    });
  }

  function deleteEvent(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/events/${item.id}`).then(response => {
        events.value.splice(index, 1);
      });
    });
  }

  return { addEvent, updateEvent, getEvents, deleteEvent, events, loading, event };
});
