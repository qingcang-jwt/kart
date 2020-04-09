import Vue from 'vue';
import { Button } from 'ant-design-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './style/style.less';
import MyIcon from './components/MyIcon';

Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component('MyIcon', MyIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
