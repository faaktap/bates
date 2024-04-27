import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'


import AppLayout from '@/layouts/AppLayout'
Vue.component('AppLayout', AppLayout)

Vue.config.productionTip = true

// Vue.mixin({
//   created() {
//     console.log('[created]1 ' + this.$options.name,)
//   },
// });


import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

Vue.prototype.$playSound = (path = 'img/SodaCanOpen.mp3', volume = .5) => {
  var audio = new Audio(path);
  audio.volume = volume
  audio.play();
  console.log(path)
}


window.onerror = function(message, url, lineNumber) {
  alert(message + lineNumber + url)
  return true;
};


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

// WIL NIE WERK NIE - main.js nie gesien nie???
// import VBack from './components/base/VBack.vue'
// Vue.component('VBack', VBack)

// Vue.component('my-component', {
//   name: 'my-component',
//   template: '<div>A custom component!</div>'
// })

// Vue.component('v-back', resolve => { require(['@/components/base/VBack.vue'], resolve) })

// import VueHtmlToPaper from 'vue-html-to-paper';
// Vue.use(VueHtmlToPaper, {
//   name: '_blank',
//   specs: [
//     'fullscreen=yes',
//     'titlebar=yes',
//     'scrollbars=yes'
//   ],
//   styles: [
//     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
//     'https://unpkg.com/kidlat-css/css/kidlat.css'
//   ]
// })
console.log('hello', Vue.prototype)
new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

