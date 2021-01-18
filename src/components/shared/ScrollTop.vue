<template>
  <a
    id="scroll-top"
    href="javascript:;"
    title="Scroll to top"
    @click.prevent="scrollTop"
  >
    <font-awesome-icon :icon="['fas', 'chevron-up']" />
  </a>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ScrollTop',
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
@import '@/assets/scss/components/_scrollTop.scss';
</style>
