<template>
  <div class="navbar-wrap">
    <div id="desktop-admin-navbar" class="navbar-content">
      <div class="navbar-topbar">
        <div class="d-flex">
          <div class="navbar-brand-box">
            <router-link to="/index" class="logo">
              <span class="logo-sm">
                <img src="~@/assets/images/logo_s.svg" alt="Logo" />
              </span>
              <span class="logo-lg">
                <img src="~@/assets/images/logo.svg" alt="Logo" />
              </span>
            </router-link>
          </div>
          <button
            type="button"
            class="burger-menu btn btn-sm"
            @click="toggleBtn"
          >
            <font-awesome-icon icon="bars"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
    <div id="mobile-admin-navbar">
      <a href="#" class="navbar-toggle" @click.prevent="toggleMenu">
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
      <router-link to="/admin/products" class="navbar-brand">
        <img class="logo" src="~@/assets/images/logo.svg" alt="Logo"
      /></router-link>
      <router-link to="/index" class="navbar-store">
        <font-awesome-icon :icon="['fas', 'store']" />
      </router-link>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'AdminNavbar',
  methods: {
    toggleBtn() {
      $('#app').toggleClass('sidebar-enable')
    },
    toggleMenu() {
      $(document.body).toggleClass('fixed-menu')
      $('.hamburger').toggleClass('active')
      $('.main-panel').toggleClass('open')
      $('.navbar-brand').toggleClass('hidden')
      $('.navbar-store').toggleClass('hidden')
      $('.navbar-toggle').toggleClass('fixed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminNavbar.scss';
</style>
