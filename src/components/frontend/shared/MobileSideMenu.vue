<template>
  <div class="mobile-side-menu">
    <div class="login-panel">
      <div class="container">
        <form
          class="form-loginIn"
          :model="user"
          @submit.prevent="login"
        >
          <div class="header-box">
            <a
              href="#"
              class="btn btn-close-mobile"
              @click.prevent="closeLogin"
            >
              <span class="material-icons">
                keyboard_arrow_left
              </span>
              <span class="menu-title">Menu</span>
            </a>
          </div>
          <div class="auth-box">
            <div class="input-group">
              <font-awesome-icon :icon="['fas', 'user-circle']" />
              <label
                for="inputEmail"
                class="sr-only"
              >Email address</label>
              <input
                id="email-mobile"
                v-model="user.username"
                type="email"
                class="form-control form-control-username"
                placeholder="Email address"
                required
                autofocus
                autocomplete="off"
              >
            </div>
            <div class="input-group">
              <font-awesome-icon :icon="['fas', 'lock']" />
              <label
                for="inputPassword"
                class="sr-only"
              >Password</label>
              <input
                id="password-mobile"
                v-model="user.password"
                type="password"
                class="form-control form-control-password"
                placeholder="Password"
                required
                autocomplete="off"
              >
            </div>
            <div class="remember text-left mt-3 mb-4">
              <el-checkbox v-model="checked">Remember Me</el-checkbox>
            </div>
            <div class="login-button mt-3">
              <button
                :class="{
                  disabled: user.username === '' || user.password === ''
                }"
                class="btn btn-lg btn-block btn-login"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
          <img
            class="ad-img"
            src="~@/assets/images/login_ad_mobile.jpg"
            alt="Login advertising img"
          >
        </form>
      </div>
    </div>
    <div class="main-panel">
      <div class="container">
        <div class="navbar-panel">
          <div class="navbar-wrap">
            <router-link
              to="/"
              class="navbar-item"
            >
              Home
            </router-link>
            <router-link
              to="/about"
              class="navbar-item"
            >
              About
            </router-link>
            <router-link
              to="/watches"
              class="navbar-item"
              :class="{ 'router-link-exact-active': isActive }"
            >
              Watches
            </router-link>
            <router-link
              to="/FAQ"
              class="navbar-item"
            >
              FAQ
            </router-link>
            <router-link
              to="/contact"
              class="navbar-item"
            >
              Contact Us
            </router-link>
            <a
              v-if="isLogin === ''"
              href="#"
              class="navbar-item"
              @click.prevent="toggleLogin"
            >
              Login
            </a>
            <div
              v-else
              class="login-wrap"
            >
              <a
                href="#"
                class="navbar-item btn-admin"
                @click.prevent="goAdmin"
              >
                Administrator
              </a>
              <a
                href="#"
                class="navbar-item btn-logout"
                @click.prevent="logout"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import removeSettings from '@/utils/removeSettings.js'
import { setCookie, getCookie, clearCookie } from '@/utils/cookie.js'

export default {
  name: 'MobileSideMenu',
  data() {
    return {
      isActive: this.activeState,
      isDisabled: true,
      checked: false,
      user: {
        username: '',
        password: ''
      },
      isLogin: ''
    }
  },
  mounted() {
    this.getCookie()
    this.removeSettings()
  },
  methods: {
    removeSettings,
    toggleLogin() {
      $('.login-panel').toggleClass('open')
    },
    closeLogin() {
      $('.login-panel').removeClass('open')
    },
    goAdmin() {
      this.$router.push('/admin/products')
      this.removeSettings()
    },
    login() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      this.$http.post(api, this.user).then(response => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Already login',
            type: 'success'
          })
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`
          vm.$router.push('/admin/products')
          vm.isLoading = false
          $('#loginModal').modal('hide')
          this.submitCookie()
        } else {
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          })
        }
      })
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
          this.removeSettings()
        }
      })
    },
    submitCookie() {
      const vm = this
      if (vm.checked === true) {
        vm.setCookie(vm.user.username, vm.user.password, true, 7)
        vm.checked = true
      } else {
        vm.clearCookie()
      }
    },
    setCookie,
    getCookie,
    clearCookie
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/_mobileSideMenu.scss';
</style>
