import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'home' },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/form',
      name: 'form',
      meta: { title: 'form' },
      component: () => import('../views/Form.vue')
    },
    {
      path: '/table',
      name: 'table',
      meta: { title: 'table' },
      component: () => import('../views/Table.vue')
    }
  ]
})
