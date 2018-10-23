import Vue from 'vue';
import AlertVue from './alert.vue';

const AlertConstructor = Vue.extend(AlertVue);
const instance = new AlertConstructor({
    el: document.createElement('div')
});

const Alert = (options = {}) => {
    options.mes?instance.mes = options.mes:'';
    options.callback?instance.callback = options.callback:'';
    instance.visible = true;
    instance.closed=false;
    instance.activeClass = 'enter-active';
    document.body.appendChild(instance.$el);
};

export default Alert;
