import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    product: {},
    newProducts: [],
    productTitle: '',
    productCategory: '',
    titleName: '',
    filterText: 'All'
  },
  mutations: {
    PRODUCT(state, payload) {
      state.product = payload
    },
    NEW_PRODUCTS(state, payload) {
      state.newProducts = payload
    },
    PRODUCT_TITLE(state, payload) {
      state.productTitle = payload
    },
    PRODUCT_CATEGORY(state, payload) {
      state.productCategory = payload
    },
    TITLE_NAME(state, payload) {
      state.titleName = payload
    },
    PRODUCTS_ARRAY(state, payload) {
      const productsArray = Object.values(payload).map(item => {
        return item
      })
      state.productCategory = productsArray
    },
    FILTER_TEXT(state, payload) {
      state.filterText = payload
    }
  },
  actions: {
    getProduct(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${payload}`
      context.commit('LOADING', true, { root: true })
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('PRODUCT_CATEGORY', response.data.product.category)
          context.commit('PRODUCT', response.data.product)
          context.commit('PRODUCT_TITLE', response.data.product.title)
          context.commit('LOADING', false, { root: true })
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
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    getProducts(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true, { root: true })
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('NEW_PRODUCTS', response.data.products)
          context.commit('PRODUCTS_ARRAY', response.data.products)
          context.commit('LOADING', false, { root: true })
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
          context.commit('LOADING', false, { root: true })
        }
      })
    },
    getChangeProduct(context, payload) {
      context.commit('LOADING', true, { root: true })
      setTimeout(() => {
        router.push({ name: 'ProductsDetails', params: { id: payload.id } })
        window.scrollTo(0, 0)
        context.commit('PRODUCT', payload)
        context.commit('PRODUCT_TITLE', payload.title)
        context.commit('LOADING', false, { root: true })
      }, 1000)
    }
  },
  getters: {
    newProducts(state) {
      return state.newProducts.map((item, index) => {
        item.stars = index
        item.stars = item.title.substr(8, 1)
        if (item.stars === '1' || item.stars === '8') {
          item.stars = 3
        } else if (item.stars === '2' || item.stars === '7') {
          item.stars = 5
        } else if (item.stars === '3' || item.stars === '6') {
          item.stars = 4
        } else if (item.stars === '4' || item.stars === '5') {
          item.stars = 3.5
        } else if (item.stars === '0' || item.stars === '9') {
          item.stars = 4.5
        } else {
          item.stars = 2
        }
        return item
      })
    },
    pickFeatured(state, getters) {
      return getters.newProducts
        .filter(item => {
          return item.price >= 26000 && item.price < 34000
        })
        .slice(0, 6)
    },
    pickNewArrivals(state, getters) {
      return getters.newProducts
        .filter(item => {
          return item.price >= 10000 && item.price < 15000
        })
        .slice(0, 6)
    },
    pickBestSellers(state, getters) {
      return getters.newProducts
        .filter(item => {
          return item.price >= 16000 && item.price < 28000
        })
        .slice(1, 7)
    },
    pickOnSale(state, getters) {
      return getters.newProducts
        .filter(item => {
          return item.price >= 12000 && item.price < 30000
        })
        .slice(11, 17)
    },

    filterCategory(state) {
      const filter = state.newProducts.filter(item => {
        return (
          item.category === state.product.category &&
          item.title.indexOf(state.productTitle)
        )
      })
      return filter.map((item, index) => {
        item.stars = index
        item.stars = item.title.substr(8, 1)
        if (item.stars === '1' || item.stars === '8') {
          item.stars = 3
        } else if (item.stars === '2' || item.stars === '7') {
          item.stars = 5
        } else if (item.stars === '3' || item.stars === '6') {
          item.stars = 4
        } else if (item.stars === '4' || item.stars === '5') {
          item.stars = 3.5
        } else if (item.stars === '0' || item.stars === '9') {
          item.stars = 4.5
        } else {
          item.stars = 2
        }
        return item
      })
    },
    filterProducts(state) {
      return state.newProducts.filter(item => {
        if (state.filterText === 'All') {
          return item.category
        } else if (state.filterText === 'Casual') {
          return item.category === state.filterText
        } else if (state.filterText === 'Stylish') {
          return item.category === state.filterText
        } else if (state.filterText === 'Classic') {
          return item.category === state.filterText
        } else if (state.filterText === 'Luxury') {
          return item.category === state.filterText
        }
        return false
      })
    },
    getCasualNum(state) {
      return state.newProducts.filter(item => {
        return item.category === 'Casual'
      })
    },
    getStylishNum(state) {
      return state.newProducts.filter(item => {
        return item.category === 'Stylish'
      })
    },
    getClassicNum(state) {
      return state.newProducts.filter(item => {
        return item.category === 'Classic'
      })
    },
    getLuxuryNum(state) {
      return state.newProducts.filter(item => {
        return item.category === 'Luxury'
      })
    }
  }
}
