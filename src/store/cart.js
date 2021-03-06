import axios from 'axios'
import $ from 'jquery'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    isOpen: false,
    cart: {
      carts: []
    },
    quantity: 1
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload
    },
    OPEN_CART(state, payload) {
      state.isOpen = payload
    },
    CURRENT_QTY(state, payload) {
      state.quantity = payload
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
      const productId = id
      const sameCarts = context.state.cart.carts.filter(item => {
        return productId === item.product_id
      })
      const sameCartsQty = sameCarts.reduce((prev, curr) => {
        return prev + curr.qty
      }, 0)
      if (sameCarts.length >= 1) {
        for (let i = 0; i < sameCarts.length; i += 1) {
          const item = sameCarts[i]
          context.dispatch('removeCartItemNoAlert', item.id)
        }
      }
      context.commit('LOADING_ITEM', id, { root: true })
      axios
        .post(api, { data: { product_id: productId, qty: qty + sameCartsQty } })
        .then(response => {
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
            context.commit('CURRENT_QTY', 1)
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
    removeCartItemNoAlert(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING_ITEM', id, { root: true })
      axios.delete(api).then(response => {
        if (response.data.success) {
          context.commit('LOADING_ITEM', '', { root: true })
          context.dispatch('getCart')
        } else {
          context.dispatch(
            'alertModules/pushMessages',
            Message({
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
    changeCartQty(context, { id, qty }) {
      const idx = $.map(context.state.cart.carts, function(item) {
        return item.product_id
      }).indexOf(id)
      const currentId = context.state.cart.carts[idx].id
      const cartIdApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${currentId}`
      const cartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING', true, { root: true })
      axios.delete(cartIdApi).then(response => {
        if (response.data.success) {
          axios.post(cartApi, { data: cart }).then(response => {
            if (response.data.success) {
              context.dispatch(
                'alertModules/pushMessages',
                Message({
                  showClose: true,
                  message: 'Modified product quantity',
                  type: 'success'
                }),
                { root: true }
              )
              context.commit('LOADING', false, { root: true })
              context.dispatch('getCart')
            }
          })
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
