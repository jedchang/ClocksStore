<template>
  <div class="wrapper faq-wrapper">
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
          <div class="col-lg-12 col-md-12">
            <FaqOnlinePurchases></FaqOnlinePurchases>
            <FaqProductDelivery></FaqProductDelivery>
            <FaqReturnsExchanges></FaqReturnsExchanges>
          </div>
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
import CartSideBar from '@/components/shared/CartSideBar'
import Navbar from '@/components/shared/Navbar'
import MobileSideMenu from '@/components/shared/MobileSideMenu'
import Breadcrumb from '@/components/shared/Breadcrumb'
import FaqOnlinePurchases from '@/components/faq/FaqOnlinePurchases'
import FaqProductDelivery from '@/components/faq/FaqProductDelivery'
import FaqReturnsExchanges from '@/components/faq/FaqReturnsExchanges'
import LoginModal from '@/components/shared/LoginModal'
import MobileScrollTop from '@/components/shared/MobileScrollTop'
import Footer from '@/components/shared/Footer'
import ScrollTop from '@/components/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState } from 'vuex'

export default {
  name: 'Faq',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    FaqOnlinePurchases,
    FaqProductDelivery,
    FaqReturnsExchanges,
    LoginModal,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity
    })
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'FAQ')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_faq.scss';
</style>
