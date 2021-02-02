<template>
  <div class="sale-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-12">
          <router-link
            to="/watches/-MJ_EJ0YFCTPzaRW1Uw_"
            class="item"
          >
            <div class="item-img">
              <img
                src="~@/assets/images/promo_img_01.jpg"
                alt="Promo img"
              >
            </div>
            <div class="item-inner">
              <p class="badge">Most Popular</p>
              <div class="title">Sale for Men</div>
              <div class="subtitle">Shop for the latest items</div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-4 col-md-4 col-12">
          <router-link
            to="/watches/-MJ_Dupud6EqdnCfMcQG"
            class="item"
          >
            <div class="item-img">
              <img
                src="~@/assets/images/promo_img_02.jpg"
                alt="Promo img"
              >
            </div>
            <div class="item-inner">
              <p class="badge">Watch Sale</p>
              <div class="title">Upto 25% Off</div>
              <div class="subtitle">huge range of designer watches</div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-4 col-md-4 col-12">
          <router-link
            to="/watches/-MJ_AbVMz6pCQ4Dn8FyM"
            class="item item-large"
          >
            <div class="item-img">
              <img
                src="~@/assets/images/promo_img_03.jpg"
                alt="Promo img"
              >
            </div>
            <div class="item-inner">
              <p class="badge">Hot Styles</p>
              <div class="title">Discount on Watch</div>
              <div class="subtitle">for Men, Women & Kids.</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleArea'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_saleArea.scss';
</style>
