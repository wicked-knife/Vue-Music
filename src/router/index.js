import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend/Recommend'
import Singer from '@/components/Singer/Singer'
import Rank from '@/components/Rank/Rank'
import Search from '@/components/Search/Search'
import SingerDetail from '@/components/singer-detail/singer-detail'
import RankList from '@/components/RankList/RankList'
import UserCenter from '@/components/User-Center/User-Center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: Recommend
    }, {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: RankList
      }]
    }, {
      path: '/search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/center',
      component: UserCenter
    }
  ]
})
