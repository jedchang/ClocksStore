<template>
  <div class="wrapper home-wrapper">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes" />
              <div class="hours" />
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <MobileSideMenu />
    <div class="content-wrapper">
      <CartSideBar />
      <Navbar @open-modal="openModal" />
      <div class="banner-area">
        <Banner :banners-data="banners" />
        <MobileBanner :banners-data="banners" />
      </div>
      <SaleArea />
      <PromoArea />
      <AdArea />
      <GalleryArea />
      <MobileScrollTop />
      <Footer />
      <ScrollTop />
      <LoginModal />
    </div>
  </div>
</template>

<script>
import CartSideBar from '@/components/frontend/shared/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import LoginModal from '@/components/frontend/shared/LoginModal'
import Banner from '@/components/frontend/index/Banner'
import MobileBanner from '@/components/frontend/index/MobileBanner'
import SaleArea from '@/components/frontend/index/SaleArea'
import PromoArea from '@/components/frontend/index/PromoArea'
import AdArea from '@/components/frontend/index/AdArea'
import GalleryArea from '@/components/frontend/index/GalleryArea'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Index',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    LoginModal,
    Banner,
    MobileBanner,
    SaleArea,
    PromoArea,
    AdArea,
    GalleryArea,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      setOpacity: (state) => state.setOpacity,
      banners: (state) => state.banners
    }),
    ...mapState('productsModules', {
      productCategory: (state) => state.productCategory
    })
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('productsModules/getProducts')
    this.$store.dispatch('cartModules/getCart')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal,
    ...mapActions('productsModules', ['getProducts'])
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_index.scss';
</style>
