import Vue from 'vue';
import ConfirmVue from './confirm.vue';
const ConfirmConstructor = Vue.extend(ConfirmVue);


const instance = new ConfirmConstructor({
    el: document.createElement('div')
});

const Confirm = (options = {}) => {
    options.mes?instance.mes = options.mes:'';
    options.title?instance.title = options.title:'';
    options.callback?instance.callback = options.callback:'';
    options.cancelText?instance.cancelText = options.cancelText:'';
    options.okText?instance.okText = options.okText:'';
    instance.visible = true;
    instance.closed=false;
    instance.activeClass = 'enter-active';
    document.body.appendChild(instance.$el);

};

export default Confirm;
