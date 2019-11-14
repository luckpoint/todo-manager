// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Axios from './plugins/axios'

import Hello from './views/Hello.vue'
import Profile from './views/Profile.vue'
import TodoManager from './components/TodoManager.vue'
import HighlightJs from './directives/highlight'

import { Auth0Plugin, authGuard } from './auth'
import { domain, clientId, audience } from '../auth_config.json'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Axios)

Vue.use(BootstrapVue)

library.add(faLink, faUser, faPowerOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.directive('highlightjs', HighlightJs)

Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/todo',
      component: TodoManager,
      beforeEnter: authGuard
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
