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
      <Breadcrumb />
      <div class="container page-container">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <FaqPurchaseProblem />
            <FaqOurReturnsPolicies />
            <FaqShippingService />
          </div>
        </div>
      </div>
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
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import FaqPurchaseProblem from '@/components/frontend/faq/FaqPurchaseProblem'
import FaqOurReturnsPolicies from '@/components/frontend/faq/FaqOurReturnsPolicies'
import FaqShippingService from '@/components/frontend/faq/FaqShippingService'
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState } from 'vuex'

export default {
  name: 'Faq',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    FaqPurchaseProblem,
    FaqOurReturnsPolicies,
    FaqShippingService,
    LoginModal,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      setOpacity: (state) => state.setOpacity
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
