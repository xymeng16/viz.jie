// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Plotly from 'plotly.js-dist';

Vue.config.productionTip = false;

Vue.use(vuetify);
Vue.use(Plotly);

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: "#app",
  // components: { App },
  // template: "<App/>",
  render: h => h(App)
});
