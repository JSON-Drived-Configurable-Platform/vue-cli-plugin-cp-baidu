import Vue from 'vue';
import iView from 'iview';
import App from './App.vue';
import router from './router';
import store from './store';

import 'iview/dist/styles/iview.css';

Vue.use(iView);

// 开启debug模式
Vue.config.debug = true;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
