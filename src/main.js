import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import "@/plugins/konva";
import "@/plugins/vue-toastification";

const pinia = createPinia();
Vue.use(PiniaVuePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify: vuetify,
  pinia,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
