import axios from 'axios'
import $ from 'jquery'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    isOpen: false,
    cart: {
      carts: []
    }
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload
    },
    OPEN_CART(state, payload) {
      state.isOpen = payload
    }
  },
  actions: {
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('CART', response.data.data)
          $('#cart-total').addClass('count')
        } else {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
              duration: 0,
              showClose: true,
              message: 'An exception occurred, please try again later',
              type: 'error'
            }),
            { root: true }
          )
        }
      })
    },
    addToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING_ITEM', id, { root: true })
      axios.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
              showClose: true,
              message: 'Already added to shopping cart',
              type: 'success'
            }),
            { root: true }
          )
          context.commit('LOADING_ITEM', '', { root: true })
          context.commit('OPEN_CART', true)
          $('#cart-total').removeClass('count')
          context.dispatch('getCart')
        } else {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
              duration: 0,
              showClose: true,
              message: 'An exception occurred, please try again later',
              type: 'error'
            }),
            { root: true }
          )
          context.commit('LOADING_ITEM', '', { root: true })
        }
      })
    },
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING_ITEM', id, { root: true })
      axios.delete(api).then(response => {
        if (response.data.success) {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
              showClose: true,
              message: 'The item has been removed',
              type: 'success'
            }),
            { root: true }
          )
          context.commit('LOADING_ITEM', '', { root: true })
          context.dispatch('getCart')
        } else {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
              duration: 0,
              showClose: true,
              message: 'An exception occurred, please try again later',
              type: 'error'
            }),
            { root: true }
          )
          context.commit('LOADING_ITEM', '', { root: true })
        }
      })
    }
  },
  getters: {
    filterAddedCart(state) {
      return state.cart.carts.map(item => item.product_id)
    }
  }
}
