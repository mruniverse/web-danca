import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const usePageStore = defineStore("pageStore", () => {
  const page = ref('');
  const serach = ref('');

  function setPage(data) {
    if(data === router.currentRoute.name) return;
    page.value = data;
    router.push({ name: data });

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
 
  function getRoutesNames(routeInstance) {
    const routerComponent = router.options.routes.filter(route => route.name === routeInstance)[0];
    const routesNames = routerComponent.children.map((child) => child.name);

    return routesNames;
  }

  return { setPage, getPage, setSerach, getSerach, getRoutesNames };
});
