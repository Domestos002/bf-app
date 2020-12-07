import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CustomToasts from './components/Toast'

Vue.use(CustomToasts);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
