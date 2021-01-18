<template>
  <div class="mobile-scroll-wrap">
    <a
      id="mobile-scroll-top"
      href="javascript:;"
      title="Scroll to top"
      @click.prevent="scrollTop"
    >
      <span class="material-icons">
        keyboard_arrow_up
      </span>
      <div class="bg"></div>
    </a>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'MobileScrollTop',
  mounted() {
    window.addEventListener('scroll', this.handlerScroll)
  },
  methods: {
    handlerScroll() {
      if ($(document).scrollTop() > 300) {
        $('#scroll-top').addClass('show')
      } else {
        $('#scroll-top').removeClass('show')
      }
    },
    scrollTop() {
      $('html,body').animate(
        {
          scrollTop: 0
        },
        600
      )
      return false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_mobileScrollTop.scss';
</style>
