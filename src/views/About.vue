<template>
  <div class="wrapper about-wrapper">
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
          <div class="col-lg-12 col-md-12 col-12">
            <div class="story">
              <div class="about-img">
                <img src="~@/assets/images/about_img_01.jpg" alt="" />
              </div>
              <div class="story-txt">
                <h3>Our Story Is Your Story</h3>
                <p>
                  Quisque libero metus, condimentum nec, tempor a, commodo
                  mollis, magna. Sed consequat, leo eget bibendum sodales, augue
                  velit cursus nunc, quis gravida magna mi a libero. Sed cursus
                  turpis vitae tortor. Nullam cursus lacinia erat. Nullam
                  accumsan lorem in dui.Praesent metus semper a, adipiscing nec,
                  purus. Ut a nisl id ante tempus hendrerit. Sed fringilla
                  mauris sit amet nibh. Vestibulum ante ipsum primis in faucibus
                  orci luctus et ultrices posuere cubilia Curae; In ac dui quis
                  mi consectetuer lacinia.
                </p>
              </div>
            </div>
            <div class="introduce">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="about-img">
                    <img src="~@/assets/images/about_img_02.jpg" alt="" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="info">
                    <h3>We are a lifestyle brand</h3>
                    <p>
                      Nullam cursus lacinia erat. Nullam accumsan lorem in
                      dui.Praesent metus semper a, adipiscing nec, purus. Ut a
                      nisl id ante tempus hendrerit. Sed fringilla mauris sit
                      amet nibh. Vestibulum ante ipsum primis in faucibus orci
                      luctus et ultrices posuere cubilia Curae; In ac dui quis
                      mi consectetuer lacinia.
                    </p>
                    <router-link to="/watches" class="btn btn-shop-now"
                      >Shop Now</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 order-2 col-12">
                  <div class="about-img">
                    <img src="~@/assets/images/about_img_03.jpg" alt="" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 order-1 col-12">
                  <div class="info last">
                    <h3>The design team working with InfoTech, Pune</h3>
                    <p>
                      It's about time to empower one another to become who you
                      want to become and not the ones the society believe we are
                      supposed to become. To be successful, simply be who you
                      are!
                    </p>
                    <router-link to="/watches" class="btn btn-shop-now"
                      >Shop Now</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
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
import LoginModal from '@/components/shared/LoginModal'
import MobileScrollTop from '@/components/shared/MobileScrollTop'
import Footer from '@/components/shared/Footer'
import ScrollTop from '@/components/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState } from 'vuex'

export default {
  name: 'About',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
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
    this.$store.commit('productsModules/TITLE_NAME', 'About')
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
@import '@/assets/scss/page/_about.scss';
</style>
