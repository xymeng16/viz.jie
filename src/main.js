// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  vuetify : new Vuetify(),
  el: "#app",
  components: { App },
  template: "<App/>",
  render: h => h(App)
});
