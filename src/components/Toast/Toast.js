import { EventBus } from "./event-bus.js";

export default {
    data() {
        return {
            messages: [],
            count: 0,
            timeOut: 3000,
            maxMessages: 5,
        }
    },

    mounted() {
        EventBus.$on("toast-message", this.handleMessage);
    },

    methods: {
        handleMessage(options) {
            this.addMessage(options);
        },

        addMessage({ message, type}) {
            let id = this.count++;

            this.messages.push({
                id: id,
                message: message,
                type: type,
                timer: this.startTimer(id)
            });

            if(this.messages.length > this.maxMessages - 1) {
                this.messages.shift();
            }
        },

        startTimer: function(id) {
            return setTimeout(() => this.remove(id), this.timeOut);
        },

        remove(id) {
            this.messages = this.messages.filter(el => el.id !== id);
        }
    }
};
