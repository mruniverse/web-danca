import { inject, nextTick, onBeforeMount, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUserStore } from "../user";
import { useEnvironmentStore } from "../Environment/environment";

export const useEventStore = defineStore("eventStore", () => {
  const notify = inject("toast");
  const userStore = useUserStore();
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

  onBeforeMount(() => {
    whileLoading(async () => {
      await getEvents();
    });
  });

  async function getEventName(id) {
    return new Promise((resolve, reject) => {
      if(events.value.length === 0) return;
      const found = events.value.find(event => event.id === id);
      resolve(found ? found.lang.name : 'Evento não encontrado');
    });
  }

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
        notify.success('Evento criado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function updateEvent(item, index) {
    return whileLoading(async () => {
      return await api.put(`/events/${item.id}`, item).then(response => {
        Object.assign(events.value[index], item)
        notify.success('Evento atualizado com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  async function getEvents() {
    return whileLoading(async () => {
      return await api.get('/events').then(response => {
        events.value = response.data.map((item) => {
          let environment_name = environmentStore.getEnvironmentName(item.environment_id);
          let planner_name = userStore.getUserName(item.planner_id);
          var newItem = item;

          Promise.all([environment_name, planner_name]).then((values) => {
            console.log(values);
            
            newItem.image = null;
            newItem.title = item.lang.name;
            newItem.environment_name = values[0];
            newItem.planner_name = values[1];
            newItem.initial_datetime = new Date(item.initial_datetime).toISOString();
            newItem.initial_sales_ticket = new Date(item.initial_sales_ticket).toISOString();
            newItem.final_datetime = new Date(item.final_datetime).toISOString();
            newItem.final_datetime_formated = new Date(item.final_datetime).toLocaleDateString();
            newItem.final_sales_ticket = new Date(item.final_sales_ticket).toISOString();
            newItem.final_sales_ticket_formated = new Date(item.final_sales_ticket).toLocaleDateString();
          });

          return newItem;
        }).reverse();
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  function deleteEvent(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/events/${item.id}`).then(response => {
        events.value.splice(index, 1);
        notify.success('Evento excluído com sucesso!');
      }).catch(error => {
        notify.error(error.message);
      });
    });
  }

  return { addEvent, updateEvent, getEvents, deleteEvent, events, loading, event, getEventName, whileLoading };
});
