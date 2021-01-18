import axios from 'axios'
import $ from 'jquery'
import router from '@/router'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    order: {
      user: {}
    }
  },
  mutations: {
    GET_ORDER(state, payload) {
      state.order = payload
    }
  },
  actions: {
    addCouponCode(context, couponCode) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: couponCode
      }
      context.commit('LOADING_COUPON', couponCode, { root: true })
      return new Promise((resolve, reject) => {
        axios.post(api, { data: coupon }).then(response => {
          if (response.data.success) {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'Coupon applied',
                type: 'success'
              }),
              { root: true }
            )
            context.commit('LOADING_COUPON', '', { root: true })
            resolve()
          } else {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'No coupon found',
                type: 'error'
              }),
              { root: true }
            )
            context.commit('LOADING_COUPON', '', { root: true })
            reject()
          }
        })
      })
    },
    createOrder(context, form) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = form
      context.commit('LOADING_ORDER', form, { root: true })
      return new Promise((resolve, reject) => {
        axios.post(api, { data: order }).then(response => {
          if (response.data.success) {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'Order created',
                type: 'success'
              }),
              { root: true }
            )
            context.commit('LOADING_ORDER', '', { root: true })
            router.push(`checkout/${response.data.orderId}`)
            resolve()
          } else {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'Order creation failed, please try again later',
                type: 'error'
              }),
              { root: true }
            )
            context.commit('LOADING_ORDER', '', { root: true })
            reject()
          }
        })
      })
    },
    getOrder(context, orderId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`
      context.commit('LOADING', true, { root: true })
      axios.get(api).then(response => {
        context.commit('GET_ORDER', response.data.order)
        context.commit('LOADING', false, { root: true })
      })
    },
    payOrder(context, orderId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`
      context.commit('LOADING_ORDER', orderId, { root: true })
      return new Promise((resolve, reject) => {
        axios.post(api).then(response => {
          if (response.data.success) {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'Payment completed',
                type: 'success'
              }),
              { root: true }
            )
            $('.step-3')
              .removeClass('current')
              .addClass('valid')
            context.commit('LOADING_ORDER', '', { root: true })
            resolve()
          } else {
            context.dispatch(
              'alertModules/pushMessages',
              Message({
                showClose: true,
                message: 'Payment failed, please try again later',
                type: 'error'
              }),
              { root: true }
            )
            context.commit('LOADING_ORDER', '', { root: true })
            reject()
          }
        })
      })
    }
  }
}
