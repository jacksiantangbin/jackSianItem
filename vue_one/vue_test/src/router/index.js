import Vue from 'vue'
import Router from 'vue-router'
import TestOne from '../vives/TestOne'
import TestTwo from '../vives/TestTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestOne',
      component: TestOne
    },
    {
      path: '/TestTwo',
      name: 'TestTwo',
      component: TestTwo
    }
  ]
})
