<template>
  <div class="wrapper contact-wrapper">
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
          <div class="col-lg-4 col-md-4 col-6 border-right-color order-1">
            <div class="item">
              <font-awesome-icon :icon="['fas', 'phone-alt']" />
              <h4>Talk to us</h4>
              <ul>
                <li class="phone">
                  <p>Phone:</p>
                  <span>0803-080-3081</span>
                </li>
                <li class="phone">
                  <p>Fax:</p>
                  <span>0803-080-3082</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-12 border-right-color order-3">
            <div class="item">
              <font-awesome-icon :icon="['fas', 'envelope-open-text']" />
              <h4>Contact us</h4>
              <ul>
                <li>
                  <a
                    href="mailto://march.24@gmail.com"
                    target="_blank"
                  >march.24@gmail.com</a>
                </li>
                <li>
                  <a
                    href="mailto://march.24@gmail.com"
                    target="_blank"
                  >support@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-6 border-bottom-color order-2">
            <div class="item">
              <font-awesome-icon :icon="['fas', 'location-arrow']" />
              <h4>Location</h4>
              <ul>
                <li class="location">
                  <p>No: 58 A, East Madison Street,</p>
                </li>
                <li>
                  <p>Baltimore, MD, USA 4508</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-10 col-md-12 mx-auto col-12 order-4">
            <ContactForm />
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
import CartSideBar from '@/components/frontend/cart/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import ContactForm from '@/components/frontend/contact/ContactForm'
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState } from 'vuex'

export default {
  name: 'Contact',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    ContactForm,
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
    this.$store.commit('productsModules/TITLE_NAME', 'Contact Us')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 1000)
  },
  methods: {
    openModal
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_contact.scss';
</style>
