import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueTimeago from './TimeAgo'
import PhoneAPI from './PhoneAPI'
import Notification from './Notification'
import AutoFocus from './directives/autofocus'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

Vue.use(VueTimeago)
Vue.use(Notification)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.prototype.$phoneAPI = PhoneAPI

window.VueTimeago = VueTimeago
window.Vue = Vue
window.store = store

Vue.directive('autofocus', AutoFocus)

/* eslint-disable no-new */
window.APP = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

Sentry.init({
  dsn: 'https://af5384de8c5f44c0bf01b92a95a183cf@o157063.ingest.sentry.io/5341297',
  integrations: [new VueIntegration({
    Vue,
    attachProps: true,
    logErrors: true,
    release: 'vue@1.3'
  })]
})
console.log('Sentry ON!')
