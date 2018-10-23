import Vue from 'vue';
import LoadingVue from './loading.vue';
const LoadingConstructor = Vue.extend(LoadingVue);

const instance = new LoadingConstructor({
    el: document.createElement('div')
});


export default {
    open: instance.open,
    close: instance.close
};

