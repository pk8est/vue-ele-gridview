import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import TreeView from "vue-json-tree-view"
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'medium'
})
Vue.use(TreeView)

new Vue({
  render: h => h(App)
}).$mount('#app')
