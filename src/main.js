import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import './bus'
import filterCurrency from './utils/filterCurrency'
import filterDate from './utils/filterDate'
import store from './store'

import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'

import {
  Message,
  Radio,
  RadioGroup,
  Checkbox,
  Tooltip,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  InputNumber
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'

import { required, email, numeric } from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'

import VuePictureSwipe from 'vue-picture-swipe'
import VueClipboard from 'vue-clipboard2'
library.add(fas, far, fab)
Vue.prototype.$message = Message
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(InputNumber)

localize('zh_TW', TW)
extend('email', email)
extend('numeric', numeric)
extend('email-required', {
  ...required,
  message: 'Email is required'
})
extend('name-required', {
  ...required,
  message: 'Name is required'
})
extend('tel-required', {
  ...required,
  message: 'Phone is required'
})
extend('addr-required', {
  ...required,
  message: 'Address is required'
})
extend('msg-required', {
  ...required,
  message: 'Message is required'
})

configure({
  classes: {
    valid: 'valid',
    invalid: 'invalid'
  }
})

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)

Vue.component('Loading', Loading)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('simplebar', simplebar)
Vue.component('vue-picture-swipe', VuePictureSwipe)

Vue.filter('currency', filterCurrency)
Vue.filter('date', filterDate)

axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
