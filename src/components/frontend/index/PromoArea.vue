<template>
  <div class="promo-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <el-tabs v-model="activeName">
            <el-tab-pane
              label="Featured"
              name="tab1"
            >
              <span
                slot="label"
                class="item-title"
              >
                Featured
              </span>
              <PromoItem :pick-product="pickFeatured" />
            </el-tab-pane>
            <el-tab-pane
              label="New Arrivals"
              name="tab2"
            >
              <span
                slot="label"
                class="item-title"
              >
                New Arrivals
              </span>
              <PromoItem :pick-product="pickNewArrivals" />
            </el-tab-pane>
            <el-tab-pane
              label="Best Sellers"
              name="tab3"
            >
              <span
                slot="label"
                class="item-title"
              >
                Best Sellers
              </span>
              <PromoItem :pick-product="pickBestSellers" />
            </el-tab-pane>
            <el-tab-pane
              label="On Sale"
              name="tab4"
            >
              <span
                slot="label"
                class="item-title"
              >
                On Sale
              </span>
              <PromoItem :pick-product="pickOnSale" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromoItem from '@/components/frontend/index/PromoItem'
import { mapGetters } from 'vuex'

export default {
  name: 'PromoArea',
  components: {
    PromoItem
  },
  data() {
    return {
      activeName: 'tab1'
    }
  },
  computed: {
    ...mapGetters('productsModules', [
      'newProducts',
      'pickFeatured',
      'pickNewArrivals',
      'pickBestSellers',
      'pickOnSale'
    ])
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_promoArea.scss';
</style>
