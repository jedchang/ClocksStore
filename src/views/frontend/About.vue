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
          <div class="col-lg-12 col-md-12 col-12">
            <div class="story">
              <div class="about-img">
                <img
                  src="~@/assets/images/about_img_01.jpg"
                  alt="About img"
                >
              </div>
              <div class="story-txt">
                <h3>Our Story Is Your Story</h3>
                <p>
                  Founded in 1980, CLOCKS is a lifestyle brand creating
                  reimagined classics coupled with modern elements. Each
                  timepiece is designed to be cherished—to collect stories, to
                  live a long life, and to be rediscovered season after season.
                  With a vision anchored in self-expression, CLOCKS aims to form
                  inclusive collections, collaborations, and
                  conversations—celebrating individuality and ever-evolving
                  personal style.
                </p>
              </div>
            </div>
            <div class="introduce">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="about-img">
                    <img
                      src="~@/assets/images/about_img_02.jpg"
                      alt="About img"
                    >
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="info">
                    <h3>We are a lifestyle brand</h3>
                    <p>
                      We are advocates for individuality. At the core of CLOCKS,
                      we seek to inspire, continually exploring new ways to
                      build upon our collaborative community and provide a
                      platform to share the stories of passionate creators.
                    </p>
                    <router-link
                      to="/watches"
                      class="btn btn-shop-now"
                    >Shop Now</router-link>
                  </div>
                </div>
              </div>
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 order-2 col-12">
                  <div class="about-img">
                    <img
                      src="~@/assets/images/about_img_03.jpg"
                      alt="About img"
                    >
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 order-1 col-12">
                  <div class="info last">
                    <h3>The CLOCKS standard</h3>
                    <p>
                      We're on a mission to make the most out of life—we believe
                      in pursuing progression and making time for the things
                      that bring real value into the world. Ultimately, CLOCKS
                      aims to spark and encourage cultivated conversation while
                      building a versatile and spirited community.
                    </p>
                    <router-link
                      to="/watches"
                      class="btn btn-shop-now"
                    >Shop Now</router-link>
                  </div>
                </div>
              </div>
            </div>
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
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
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
      isLoading: (state) => state.isLoading,
      setOpacity: (state) => state.setOpacity
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
