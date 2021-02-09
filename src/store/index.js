import Vue from 'vue'
import Vuex from 'vuex'
import productsModules from './products'
import cartModules from './cart'
import orderModules from './order'
import alertModules from './alert'
import wishListsModules from './wishLists'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    setOpacity: 1,
    status: {
      loadingItem: '',
      loadingWishLists: '',
      loadingCoupon: '',
      loadingOrder: '',
      fileUploading: false
    },
    banners: [
      {
        direction: 'content-left',
        img: require('@/assets/images/banners/banner_01.jpg'),
        mobile_img: require('@/assets/images/banners/banner_mobile_01.jpg'),
        subtitle: 'Built for men',
        title: 'An Extraordinary Classic',
        text:
          'This is the best in class effective watches from the luxury brand watch.co and Gizmo has put into. Lot of efforts put in these high quality watches.',
        url: '/#/watches/-MJ_CAKg7a5U1v8FsxB0'
      },
      {
        direction: 'content-right',
        img: require('@/assets/images/banners/banner_02.jpg'),
        mobile_img: require('@/assets/images/banners/banner_mobile_02.jpg'),
        subtitle: 'Empire Collection',
        title: 'The Watch Everyone Desires!',
        text:
          'The best in class elegant watches from the luxury brand Swiss Eagle high-quality watches into which a lot of care has gone in.',
        url: '/#/watches/-MJ_AKmOG6Ot3je6efEd'
      },
      {
        direction: 'content-left',
        img: require('@/assets/images/banners/banner_03.jpg'),
        mobile_img: require('@/assets/images/banners/banner_mobile_03.jpg'),
        subtitle: 'Blacktop Series - 47mm',
        title: 'New Trending Collection',
        text:
          'Expanding the offering is the choice between a leather strap or a metal bracelet, bringing the total new look. ',
        url: '/#/watches/-MJ_Co84DCHGIct5y1G1'
      },
      {
        direction: 'content-right',
        img: require('@/assets/images/banners/banner_04.jpg'),
        mobile_img: require('@/assets/images/banners/banner_mobile_04.jpg'),
        subtitle: 'MODERN SPORT SERIES - 42 MM',
        title: 'Stylish eternal wrist watches',
        text:
          'I did not even know that there were any better conditions to escape to, but I was  more than willing to take my chances.',
        url: '/#/watches/-MJ_Cy9cuar1VTeittzV'
      }
    ]
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload
    },
    LOADING_ITEM(state, payload) {
      state.status.loadingItem = payload
    },
    LOADING_WISHLISTS(state, payload) {
      state.status.loadingWishLists = payload
    },
    LOADING_COUPON(state, payload) {
      state.status.loadingCoupon = payload
    },
    LOADING_ORDER(state, payload) {
      state.status.loadingOrder = payload
    },
    SET_OPACITY(state, payload) {
      state.setOpacity = payload
    }
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload)
    }
  },
  modules: {
    productsModules,
    cartModules,
    orderModules,
    alertModules,
    wishListsModules
  }
})
