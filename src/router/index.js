import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from '@/components/Recommend/Recommend'
// import Singer from '@/components/Singer/Singer'
// import Rank from '@/components/Rank/Rank'
// import Search from '@/components/Search/Search'
// import SingerDetail from '@/components/singer-detail/singer-detail'
// import RankList from '@/components/RankList/RankList'
// import UserCenter from '@/components/User-Center/User-Center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: resolve => require(['@/components/Recommend/Recommend'], resolve)
    }, {
      path: '/singer',
      component: resolve => require(['@/components/Singer/Singer'], resolve),
      children: [{
        path: ':id',
        component: resolve => require(['@/components/singer-detail/singer-detail'], resolve)
      }]
    }, {
      path: '/rank',
      component: resolve => require(['@/components/Rank/Rank'], resolve),
      children: [{
        path: ':id',
        component: resolve => require(['@/components/RankList/RankList'], resolve)
      }]
    }, {
      path: '/search',
      component: resolve => require(['@/components/Search/Search'], resolve),
      children: [{
        path: ':id',
        component: resolve => require(['@/components/singer-detail/singer-detail'], resolve)
      }]
    }, {
      path: '/center',
      component: resolve => require(['@/components/User-Center/User-Center'], resolve)
    }
  ]
})
