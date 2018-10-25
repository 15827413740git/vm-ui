import {Confirm, Alert, Toast, Notify, Loading} from './dialog';
import {Button} from './button';
import {Scroll} from './scroll';


const install = function (Vue) {
    Vue.component(Button.name, Button);
    Vue.component(Scroll.name, Scroll);
    Vue.prototype.$dialog = {
        confirm: Confirm,
        alert: Alert,
        toast: Toast,
        notify: Notify,
        loading: Loading,
    };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};
