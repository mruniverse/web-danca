import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useUserStore } from "./user";
import { useEventTypeStore } from "@/store/Models/eventType";

export const useEventStore = defineStore("eventStore", () => {
  const userStore = useUserStore();
  const eventTypeStore = useEventTypeStore();
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
      return await api.post('/events', {
        lang: {
          name: item.lang.name,
          description: 'Sem descrição',
        },
        event_type_id: item.event_type_id,
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
        events.value = [{
          ...item,
          user_name: userStore.getUserName(item.owner_id),
          event_type_name: eventTypeStore.getEventTypeName(item.event_type_id),
        }, ...events.value];
      });
    });
  }

  async function updateEvent(item, index) {
    return whileLoading(async () => {
      return await api.put(`/events/${item.id}`, {
        lang: {
          name: item.lang.name,
        },
        event_type_id: item.event_type_id,
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
        Object.assign(events.value[index], item)
      });
    });
  }

  function getEvents() {
    return whileLoading(async () => {
      return await api.get('/events').then(response => {
        const data = response.data.map(item => {
          return {
            id: item.id,
            lang: {
              name: item.lang.name,
              description: item.lang.description,
            },
            event_type_id: item.event_type_id,
            owner_id: item.owner_id,
            user_name: userStore.getUserName(item.owner_id),
            event_type_name: eventTypeStore.getEventTypeName(item.event_type_id),
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
