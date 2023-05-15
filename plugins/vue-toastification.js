import { createApp } from "vue-demi";
import Toast from "vue-toastification";
import App from '@/App.vue'
import "vue-toastification/dist/index.css";

const app = createApp(App)

const options = {
    // You can set your default options here
};

app.use(Toast, options);