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
      <div class="banner-area">
        <Banner :banners-data="banners"></Banner>
        <MobileBanner :banners-data="banners"></MobileBanner>
      </div>
      <SaleArea></SaleArea>
      <PromoArea></PromoArea>
      <AdArea></AdArea>
      <GalleryArea></GalleryArea>
      <MobileScrollTop></MobileScrollTop>
      <Footer></Footer>
      <ScrollTop></ScrollTop>
      <LoginModal></LoginModal>
    </div>
  </div>
</template>

<script>
import CartSideBar from '@/components/shared/CartSideBar'
import Navbar from '@/components/shared/Navbar'
import MobileSideMenu from '@/components/shared/MobileSideMenu'
import LoginModal from '@/components/shared/LoginModal'
import Banner from '@/components/index/Banner'
import MobileBanner from '@/components/index/MobileBanner'
import SaleArea from '@/components/index/SaleArea'
import PromoArea from '@/components/index/PromoArea'
import AdArea from '@/components/index/AdArea'
import GalleryArea from '@/components/index/GalleryArea'
import MobileScrollTop from '@/components/shared/MobileScrollTop'
import Footer from '@/components/shared/Footer'
import ScrollTop from '@/components/shared/ScrollTop'
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
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity,
      banners: state => state.banners
    }),
    ...mapState('productsModules', {
      productCategory: state => state.productCategory
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
