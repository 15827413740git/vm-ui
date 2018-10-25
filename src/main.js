// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { baseUrl } from './config/env'

import VMUI from './components/index.js'
import './ydui.flexible.js'
import {Slider, SliderItem} from './components/slider'
Vue.component(SliderItem.name, SliderItem);
Vue.use(VMUI)
    
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
