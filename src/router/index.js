import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Champion from '@/components/Champion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },{
    	path: '/',
    	name: 'Champion',
    	component: Champion
    },{
    	path: '/champion',
    	name: 'Champion',
    	component: Champion
    }
  ]
})
