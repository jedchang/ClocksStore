import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    wishlist: []
  },
  mutations: {
    ADD_WISHLIST(state, payload) {
      state.wishlist.push(payload)
      localStorage.setItem('myWishlist', JSON.stringify(state.wishlist))
    },
    REMOVE_WISHLIST(state, payload) {
      state.wishlist.splice(state.wishlist.indexOf(payload), 1)
      localStorage.setItem('myWishlist', JSON.stringify(state.wishlist))
    },
    GET_WISHLIST(state) {
      state.wishlist = JSON.parse(localStorage.getItem('myWishlist')) || []
    }
  },
  actions: {
    addToWishlist(context, id) {
      context.commit('LOADING_WISHLIST', id, { root: true })
      setTimeout(() => {
        context.dispatch(
          'alertModules/pushMessages',
          Message({
            showClose: true,
            message: 'Already added to wish list',
            type: 'success'
          }),
          { root: true }
        )
        context.commit('ADD_WISHLIST', id)
        context.commit('LOADING_WISHLIST', '', { root: true })
      }, 1200)
    },
    removeWishlist(context, id) {
      context.commit('LOADING_WISHLIST', id, { root: true })
      setTimeout(() => {
        context.dispatch(
          'alertModules/pushMessages',
          Message({
            showClose: true,
            message: 'The item has been removed',
            type: 'success'
          }),
          { root: true }
        )
        context.commit('REMOVE_WISHLIST', id)
        context.commit('LOADING_WISHLIST', '', { root: true })
      }, 1200)
    }
  },
  getters: {
    wishlistProducts(state, getters, rootState) {
      return rootState.productsModules.newProducts.filter(item => {
        return state.wishlist.indexOf(item.id) !== -1
      })
    }
  }
}
