import Vue from 'vue';
import ToastVue from './toast.vue';
const ToastConstructor = Vue.extend(ToastVue);

const instance = new ToastConstructor({
    el: document.createElement('div')
});


const Toast = (options = {}) => {
    options.mes?instance.mes = options.mes:'';
    options.icon?instance.icon = options.icon:'';
    options.timeout?instance.timeout = ~~options.timeout:'';
    options.callback?instance.callback = options.callback:'';
    document.body.appendChild(instance.$el);
    instance.showToast()
};

export default Toast;
