import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

//import VueFriendlyIframe from 'vue-friendly-iframe';
//Vue.component('vue-friendly-iframe', VueFriendlyIframe);

import AppLayout from '@/layouts/AppLayout'
Vue.component('AppLayout', AppLayout)

Vue.config.productionTip = false

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)


window.onerror = function(message, url, lineNumber) {  
  alert(message + lineNumber + url)
  return true;
}; 

Vue.prototype.$playSound = (path, volume = .5) => {
  var audio = new Audio(path);
  audio.volume = volume
  audio.play();
}

// eslint-disable-next-line
export const cs = {
  // eslint-disable-next-line
  l: (...args) => {   
     console.log(...args);   
    }
}



Vue.prototype.$history = window.history;
Vue.prototype.$cs = cs;

import { af,en } from '@/api/translate'
const messages = {
  en,
  af
}
let i18n = new VueI18n({
  locale: 'af',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages: messages
})

new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
