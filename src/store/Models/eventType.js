import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useEventTypeStore = defineStore("eventTypeStore", () => {
  const loading = ref(false);
  const eventTypes = ref([]);

  function getEventTypeName(id) {
    if(eventTypes.value.length === 0) return;
    const found = eventTypes.value.find(eventType => eventType.id === id);
    return found ? found.name : 'Usuário não encontrado';
  }

  async function whileLoading(callback) {
    loading.value = true;
    let newCallback = await callback();
    loading.value = false;
    return newCallback;
  }

  async function addEventType(item) {
    return whileLoading(async () => {
      return await api.post('/event-types', {
        lang: {
          name: item.name
        }
      }).then(response => {
        eventTypes.value = [item, ...eventTypes.value];
      });
    });
  }

  async function updateEventType(item, index) {
    return whileLoading(async () => {
      return await api.put(`/event-types/${item.id}`, {
        lang: {
          name: item.name
        }
      }).then(response => {
        Object.assign(eventTypes.value[itemIndex], item)
      });
    });
  }

  function getEventTypes() {
    return whileLoading(async () => {
      return await api.get('/event-types').then(response => {
        const data = response.data.map(item => {
          return {
            id: item.id,
            name: item.lang.name
          }
        }).reverse();
        eventTypes.value = data;
      });
    });
  }

  function deleteEventType(item, index) {
    return whileLoading(async () => {
      return await api.delete(`/event-types/${item.id}`).then(response => {
        eventTypes.value.splice(index, 1);
      });
    });
  }

  return { addEventType, updateEventType, getEventTypes, deleteEventType, eventTypes, getEventTypeName };
});
