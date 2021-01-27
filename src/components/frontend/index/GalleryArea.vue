<template>
  <div class="gallery-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="gallery-wrapper">
            <h3 class="title">
              <span>@WATCHSTORE</span>
              Gallery Image
            </h3>
            <vue-picture-swipe
              :items="items"
              :options="{
                shareEl: false,
                zoomEl: false,
                fullscreenEl: false,
                bgOpacity:0.85
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryArea',
  data() {
    return {
      items: [
        {
          src: require('../../../assets/images/gallerys/gallery_img_01.jpg'),
          thumbnail: require('../../../assets/images/gallerys/thumbnail/gallery_img_01_s.jpg'),
          w: 600,
          h: 667
        },
        {
          src: require('../../../assets/images/gallerys/gallery_img_02.jpg'),
          thumbnail: require('../../../assets/images/gallerys/thumbnail/gallery_img_02_s.jpg'),
          w: 600,
          h: 667
        },
        {
          src: require('../../../assets/images/gallerys/gallery_img_03.jpg'),
          thumbnail: require('../../../assets/images/gallerys/thumbnail/gallery_img_03_s.jpg'),
          w: 600,
          h: 667
        },
        {
          src: require('../../../assets/images/gallerys/gallery_img_04.jpg'),
          thumbnail: require('../../../assets/images/gallerys/thumbnail/gallery_img_04_s.jpg'),
          w: 600,
          h: 667
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_galleryArea.scss';
</style>
