import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import routes from '@/routes'
import EventBus from '@/plugins/event-bus'
import msToMm from '@/filters/ms-to-mm'

Vue.use(VueRouter)
Vue.use(EventBus)
Vue.use(msToMm)

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
