import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
import Index from '@/components/page/Index';
import NIB from '@/components/IB/NIB';
import RIB from '@/components/IB/RIB';
import PIB from '@/components/IB/PIB';
import Configuration from '@/components/page/Configuration';
import ovsflow from '@/components/NetworkGraph/ovsflow';


Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          component:Index
        },
        {
          path:'/Index',
          component:Index
        },
        {
          path:'/NIB',
          component:NIB
        },
        {
          path:'/RIB',
          component:RIB
        },
        {
          path:'/PIB',
          component:PIB
        },
        {
          path:'/Configuration',
          component:Configuration
        },
        {
          path:'ovsflow/:id',
          component:ovsflow
        }
      ]
    }
  ]
})
