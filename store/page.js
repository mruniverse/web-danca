import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter, useRoute } from '@/plugins/router';

export const usePageStore = defineStore("pageStore", () => {
  const page = ref('');
  const serach = ref('');
  const router = useRouter();
  const route = useRoute();

  function setPage(data) {
    if(data === route.name) return;
    page.value = data;
  }

  function getPage() {
    return page.value;
  }

  function setSerach(data) {
    serach.value = data;
  }

  function getSerach() {
    return serach.value;
  }
 
  return { setPage, getPage, setSerach, getSerach };
});
