import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
import DashBoard from '@/components/page/DashBoard';
import Index from '@/components/page/Index';
import NIB from '@/components/IB/NIB';
import RIB from '@/components/IB/RIB';
import PIB from '@/components/IB/PIB';
import Configuration from '@/components/page/Configuration';

// import AmCharts from '@/components/page/BasicCharts';
// import FormInput from '@/components/page/FormInput';
// import FormLayouts from '@/components/page/FormLayouts';
// import BasicTables from '@/components/page/BasicTables';
// import EditorPage from '@/components/page/EditorPage';
// import MarkdownPage from '@/components/page/MarkdownPage';
// import TodoList from '@/components/page/TodoListPage';

// Vue.prototype.$http = axios
Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        // {
        //   path:'',
        //   component:DashBoard
        // },
        {
          path:'',
          component:Index
        },
        {
          path:'/Index',
          component:Index
        },
        // {
        //   path:'/DashBoard',
        //   component:DashBoard
        // },
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
        /*
        {
          path:'/EditorPage',
          component:EditorPage
        },
        {
          path:'/MarkdownPage',
          component:MarkdownPage
        },
        {
          path:'/BasicCharts',
          component:AmCharts
        },
        {
          path:'/FormInput',
          component:FormInput
        },
        {
          path:'/FormLayouts',
          component:FormLayouts
        },
        {
          path:'/BasicTables',
          component:BasicTables
        },
        {
          path:'/TodoList',
          component:TodoList
        }
        */

      ]
    }
  ]
})
