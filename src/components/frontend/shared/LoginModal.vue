<template>
  <div
    id="loginModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-lg"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-body">
          <form
            class="form-loginIn"
            :model="user"
            @submit.prevent="login"
          >
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
            <div class="auth-box">
              <h5 class="modal-title">Login</h5>
              <div class="input-group">
                <font-awesome-icon :icon="['fas', 'user-circle']" />
                <label
                  for="inputEmail"
                  class="sr-only"
                >Email address</label>
                <input
                  id="email"
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
                  id="password"
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
            <div class="ad-box">
              <p>LATEST <span>WATCHES</span> YOU CAN'T RESIST</p>
              <img
                class="ad-img"
                src="~@/assets/images/login_ad.png"
                alt="Advertising img"
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { setCookie, getCookie, clearCookie } from '@/utils/cookie.js'

export default {
  name: 'LoginModal',
  data() {
    return {
      isDisabled: true,
      checked: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    this.getCookie()
  },
  methods: {
    login() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.$http.post(api, this.user).then((response) => {
        if (response.data.success) {
          vm.$message({
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
          vm.submitCookie()
        } else {
          vm.$message({
            showClose: true,
            message: 'Login failed',
            type: 'error'
          })
          vm.user.username = ''
          vm.user.password = ''
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

<style scoped lang="scss">
@import '@/assets/scss/components/_loginModal.scss';
</style>
