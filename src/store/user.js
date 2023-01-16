import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const event_id = ref("");
	const discount_id = ref("");
  const promotion_id = ref("");
  const ticket_type_id = ref("");
  const sales_limit = ref("");
  const minimum_per_user = ref("");
  const maximum_per_user = ref("");
  const price = ref("");
  const lang = {
    name: ref(""),
  };

  return {  };
});
