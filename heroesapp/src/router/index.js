import Vue from 'vue'
import Router from 'vue-router'
import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
import HeroesList from '@/components/HeroesList'
import HeroesForm from '@/components/HeroesForm'

Vue.use(Router)

Vue.use(VueToastr, {
  defaultPosition: 'toast-bottom-full-width',
  defaultTimeout: 2000
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HeroesList',
      component: HeroesList
    },
    {
      path: '/Create',
      name: 'HeroesFormCreate',
      component: HeroesForm
    },
    {
      path: '/Edit/:id',
      name: 'HeroesFormEdit',
      component: HeroesForm
    }
  ]
})

