import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    // You can set your default options here
  };

  nuxtApp.vueApp.use(Toast, options);
});
