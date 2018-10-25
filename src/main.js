// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { baseUrl } from './config/env'

import VMUI from './components/index.js'
import './ydui.flexible.js'
Vue.use(VMUI)
//import {Confirm, Alert, Toast, Notify, Loading} from './components/dialog';
//import {Button} from './components/button';
//import { Scroll } from './components/Scroll';
//Vue.component(Scroll.name, Scroll);
//Vue.component(Button.name, Button);
//Vue.config.productionTip = false
//Vue.prototype.$dialog = {
//      confirm: Confirm,
//      alert: Alert,
//      toast: Toast,
//      notify: Notify,
//      loading: Loading,
//  };
    
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
