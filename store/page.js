import { ref } from "vue";
import { defineStore } from "pinia";

export const usePageStore = defineStore("pageStore", () => {
	const page = ref("");
	const serach = ref("");
	const route = useRoute();

	function setPage(data) {
		if (data === route.currentRoute.name) return;
		page.value = data;
		navigateTo(`/home/${data}`);
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
		const routeComponent = route.options.routes.filter((route) => route.name === routeInstance)[0];
		const routesNames = routeComponent.children.map((child) => child.name);

		return routesNames;
	}

	return { setPage, getPage, setSerach, getSerach, getRoutesNames };
});
