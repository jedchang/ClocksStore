import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    wishLists: []
  },
  mutations: {
    ADD_TO_WISHLISTS(state, payload) {
      state.wishLists.push(payload)
      localStorage.setItem('myWishLists', JSON.stringify(state.wishLists))
    },
    REMOVE_WISHLISTS(state, payload) {
      state.wishLists.splice(state.wishLists.indexOf(payload), 1)
      localStorage.setItem('myWishLists', JSON.stringify(state.wishLists))
    },
    GET_WISHLISTS(state) {
      state.wishLists = JSON.parse(localStorage.getItem('myWishLists')) || []
    }
  },
  actions: {
    addToWishLists(context, id) {
      context.commit('LOADING_WISHLISTS', id, { root: true })
      setTimeout(() => {
        context.dispatch(
          'alertModules/pushMessages',
          Message({
            showClose: true,
            message: 'Already added to wish lists',
            type: 'success'
          }),
          { root: true }
        )
        context.commit('ADD_TO_WISHLISTS', id)
        context.commit('LOADING_WISHLISTS', '', { root: true })
      }, 1200)
    },
    removeWishLists(context, id) {
      context.commit('LOADING_WISHLISTS', id, { root: true })
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
        context.commit('REMOVE_WISHLISTS', id)
        context.commit('LOADING_WISHLISTS', '', { root: true })
      }, 1200)
    }
  },
  getters: {
    wishListsProducts(state, getters, rootState) {
      return rootState.productsModules.newProducts.filter(item => {
        return state.wishLists.indexOf(item.id) !== -1
      })
    }
  }
}
