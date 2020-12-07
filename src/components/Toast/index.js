import Toast from './Toast.vue'
import { EventBus } from "./event-bus.js";

const Toasts = {
    install(Vue) {
        Vue.prototype.$toast = {
            success(message) {
                EventBus.$emit("toast-message", {
                    message: message,
                    type: 'success'
                });
            },

            error(message) {
                EventBus.$emit("toast-message", {
                    message: message,
                    type: 'error'
                });
            }
        };

        Vue.component("Toast", Toast);
    }
};

export default Toasts;
