<template>
  <div class="admin mobile-side-menu">
    <div class="main-panel">
      <div class="container">
        <div class="navbar-panel">
          <div class="navbar-wrap">
            <router-link to="/admin/products" class="navbar-item">
              Products
            </router-link>
            <router-link to="/admin/orders" class="navbar-item">
              Orders
            </router-link>
            <router-link to="/admin/coupons" class="navbar-item">
              Coupons
            </router-link>
            <a href="#" class="navbar-item btn-logout" @click.prevent="logout"
              >Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { setCookie, getCookie, clearCookie } from '@/utils/cookie.js'

export default {
  name: 'AdminMobileMenu',
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
  },
  methods: {
    toggleLogin() {
      $('.login-panel').toggleClass('open')
    },
    closeLogin() {
      $('.login-panel').removeClass('open')
    },
    goAdmin() {
      this.$router.push('/admin/products')
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

<style lang="scss"></style>
