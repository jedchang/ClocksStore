<template>
  <div class="cart-wrapper">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes"></div>
              <div class="hours"></div>
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <MobileSideMenu></MobileSideMenu>
    <div class="content-wrapper">
      <CartSideBar></CartSideBar>
      <Navbar @open-modal="openModal"></Navbar>
      <Breadcrumb></Breadcrumb>
      <div class="container page-container">
        <div class="row">
          <div class="col-lg-8 col-md-10 offset-lg-2 offset-md-1 col-12">
            <ProgressBar
              :current-progress="progressStatus"
              :current-valid="validStatus"
            ></ProgressBar>
          </div>
          <CartTable></CartTable>
        </div>
      </div>
      <MobileScrollTop></MobileScrollTop>
      <Footer></Footer>
      <ScrollTop></ScrollTop>
      <LoginModal></LoginModal>
    </div>
  </div>
</template>

<script>
import CartSideBar from '@/components/frontend/cart/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import ProgressBar from '@/components/frontend/shared/ProgressBar'
import CartTable from '@/components/frontend/cart/CartTable'
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import removeSettings from '@/utils/removeSettings.js'
import { mapState } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    ProgressBar,
    CartTable,
    LoginModal,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {
      progressStatus: 1,
      validStatus: 0
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity
    })
  },
  mounted() {
    this.removeSettings()
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Cart')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    removeSettings,
    openModal
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_cart.scss';
</style>
