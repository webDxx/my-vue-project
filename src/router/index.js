import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import product from '@/components/product'
import strategy from '@/components/strategy'
import forms from '@/components/forms'

Vue.use(Router)

const router = new Router({
  routes:[
    {
      path: '/',
      name: '管理系统',
      component: home,
      children: [
        { path: '/product', component: product, name: '列表管理' },
        // { path: '/strategy', component: strategy, name: '瞎画的' },
        { path: '/forms', component: forms, name: '表单管理' }
        // { path: '/user', component: user, name: '列表' },
      ]
    }
  ]
});
export default router;
