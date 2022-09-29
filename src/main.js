import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  pinia,
  render: function (h) { return h(App) }
}).$mount('#app')
