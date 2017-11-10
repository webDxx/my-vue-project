import Vue from 'vue'
import home from './components/Home.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(router)
Vue.use(Element)

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  //components: { App }
  render: h => h(home)
}).$mount('#app')

