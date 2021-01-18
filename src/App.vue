<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import $ from 'jquery'
import removeSettings from '@/utils/removeSettings.js'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler: function(newValue) {
        if ($('.main-panel').hasClass('open') && newValue > 767) {
          this.removeSettings()
        } else if (newValue < 767) {
          $('#loginModal').modal('hide')
          this.$store.commit('cartModules/OPEN_CART', false)
        }
      }
    }
  },
  mounted() {
    this.removeSettings()
    const vm = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        vm.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    removeSettings
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
@import './assets/scss/main.scss';
</style>
