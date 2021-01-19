<template>
  <header class="header-wrap">
    <div id="desktop-header" class="header navbar">
      <div class="container">
        <div class="header-inner">
          <div class="row main">
            <div class="col-lg-3 col-md-3 col-6">
              <div class="navbar-header">
                <router-link to="/" class="navbar-brand">
                  <img class="logo" src="~@/assets/images/logo.svg" alt=""
                /></router-link>
              </div>
            </div>
            <div class="col-lg-7 col-md-6 col-12">
              <div class="main-menu">
                <router-link to="/" class="menu-home menu-item">
                  Home
                </router-link>
                <router-link to="/about" class="menu-about menu-item">
                  About
                </router-link>
                <router-link
                  to="/watches"
                  class="menu-watches menu-item"
                  :class="{ 'router-link-exact-active': isActive }"
                >
                  Watches
                </router-link>
                <router-link to="/FAQ" class="menu-faq menu-item">
                  FAQ
                </router-link>
                <router-link to="/contact" class="menu-contact menu-item">
                  Contact
                </router-link>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-6">
              <div class="other-menu">
                <a
                  v-if="isLogin === ''"
                  href="javascript:;"
                  class="not-logined-icon icon"
                  @click="openModal"
                ></a>
                <div v-else class="dropdown">
                  <a
                    href="javascript:;"
                    class="logged-icon icon"
                    data-toggle="dropdown"
                  ></a>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        href="javascript:;"
                        class="nav-link btn-dashboard"
                        @click="goAdmin"
                      >
                        <font-awesome-icon :icon="['fas', 'chart-line']" />
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:;"
                        class="nav-link btn-logout"
                        @click="logout"
                      >
                        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                        <span>Logout</span>
                      </a>
                    </li>
                    <div class="arrow"></div>
                  </ul>
                </div>
                <router-link class="wishlist-icon icon" to="/wishlist">
                  <span v-if="wishlist.length > 0" class="wishlist-total count">
                    {{ wishlist.length }}
                  </span>
                </router-link>
                <a href="javascript:;" class="cart-icon icon" @click="openCart">
                  <span v-if="cart.carts.length > 0" class="cart-total count">
                    {{ cart.carts.length }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mobile-header">
      <a href="javascript:;" class="navbar-toggle" @click="toggleMenu">
        <svg class="hamburger" viewBox="0 0 100 100">
          <path
            class="line top"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          />
          <path class="line middle" d="m 30,50 h 40" />
          <path
            class="line bottom"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          />
        </svg>
      </a>
      <router-link to="/" class="navbar-brand">
        <img class="logo" src="~@/assets/images/logo.svg" alt="" />
      </router-link>
      <div class="other-menu">
        <router-link class="navbar-wishlist wishlist-icon icon" to="/wishlist">
          <span v-if="wishlist.length > 0" class="wishlist-total count">
            {{ wishlist.length }}
          </span>
        </router-link>
        <a
          href="javascript:;"
          class="navbar-cart cart-icon icon"
          @click="openCart"
        >
          <span v-if="cart.carts.length > 0" class="cart-total count">
            {{ cart.carts.length }}
          </span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import $ from 'jquery'
import { setCookie, getCookie, clearCookie } from '@/utils/cookie.js'
import { mapState, mapGetters } from 'vuex'

$(window).on('scroll', function() {
  if ($('#desktop-header').length > 0) {
    if ($(this).scrollTop() > 0) {
      $('#desktop-header').addClass('sticky-header')
    } else {
      $('#desktop-header').removeClass('sticky-header')
    }
  }
})

export default {
  name: 'Navbar',
  props: {
    activeState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: this.activeState,
      user: {
        username: '',
        password: ''
      },
      isLogin: ''
    }
  },
  computed: {
    ...mapState('cartModules', {
      cart: state => state.cart,
      isOpen: state => state.isOpen
    }),
    ...mapState('wishlistModules', {
      wishlist: state => state.wishlist
    }),
    ...mapGetters('productsModules', ['products'])
  },
  mounted() {
    this.getCookie()
  },
  created() {
    this.$store.commit('wishlistModules/GET_WISHLIST')
  },
  methods: {
    openModal() {
      this.$emit('open-modal')
    },
    openCart() {
      this.$store.commit('cartModules/OPEN_CART', true)
    },
    goAdmin() {
      this.$router.push('/admin/products')
    },
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm = this
      vm.isLoading = true
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Already Logged out',
            type: 'success'
          })
          setTimeout(() => {
            window.location.reload()
            vm.setCookie(vm.user.username, vm.user.password, '', 7)
          }, 1000)
        }
      })
    },
    toggleMenu() {
      $(document.body).toggleClass('fixed-menu')
      $('.hamburger').toggleClass('active')
      $('.main-panel').toggleClass('open')
      $('.navbar-brand').toggleClass('hidden')
      $('.navbar-cart').toggleClass('hidden')
      $('.navbar-wishlist').toggleClass('hidden')
      $('.navbar-toggle').toggleClass('fixed')
    },
    setCookie,
    getCookie,
    clearCookie
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_navBar.scss';
</style>
