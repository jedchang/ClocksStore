<template>
  <swiper id="mobile-banner" ref="swiperMobile" :options="swiperMobile">
    <swiper-slide v-for="(banner, index) in bannersData" :key="index">
      <a :href="banner.url" :class="banner.direction" class="content">
        <h5>{{ banner.subtitle }}</h5>
        <h2>{{ banner.title }}</h2>
        <p>
          {{ banner.text }}
        </p>
      </a>
      <img :src="banner.mobile_img" alt="" />
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    bannersData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperMobile: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletElement: 'li'
        },
        loop: true,
        notNextTick: true,
        initialSlide: 0,
        effect: 'slide',
        autoplay: {
          delay: 6000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_mobileBanner.scss';
</style>
