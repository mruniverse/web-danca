import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const usePageStore = defineStore("pageStore", () => {
  const page = ref('');
  const serach = ref('');

  function setPage(data) {
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
