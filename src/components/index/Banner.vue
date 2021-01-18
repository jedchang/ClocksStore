<template>
  <swiper id="banner" ref="swiperDesktop" :options="swiperDesktop">
    <swiper-slide v-for="(banner, index) in bannersData" :key="index">
      <div :class="banner.direction" class="content">
        <h5>{{ banner.subtitle }}</h5>
        <h2>{{ banner.title }}</h2>
        <div class="info-wrap">
          <p>
            {{ banner.text }}
          </p>
          <a :href="banner.url" class="btn btn-bordered btn-shop-now"
            >Shop Now</a
          >
        </div>
      </div>
      <img :src="banner.img" alt="" />
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
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
      swiperDesktop: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletElement: 'li'
        },
        loop: true,
        notNextTick: true,
        initialSlide: 0,
        effect: 'fade',
        autoplay: {
          delay: 6000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        speed: 800,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_banner.scss';
</style>
