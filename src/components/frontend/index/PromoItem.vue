<template>
  <ul class="product-lists-wrap">
    <li
      v-for="product in pickProduct"
      :key="product.id"
      class="product-item"
      :class="{
        'sold-out': !product.is_enabled,
        'on-sale': product.origin_price !== product.price
      }"
    >
      <router-link
        :to="{
          name: 'ProductsDetails',
          params: { id: product.id }
        }"
        :class="{
          'router-link-exact-active': $route.meta.active === '/watches/:id'
        }"
        class="product-img"
        title="View"
      >
        <div
          v-if="!product.is_enabled"
          class="sold-out-mask"
        >
          <div class="sold-out-text">Sold out</div>
        </div>
        <img
          :src="product.imageUrl"
          alt="Product img url"
        >
      </router-link>
      <div class="product-content">
        <span>{{ product.category }}</span>
        <h4>
          <router-link
            :to="{
              name: 'ProductsDetails',
              params: { id: product.id }
            }"
            class="name"
          >{{ product.title }}</router-link>
        </h4>
        <div class="product-action">
          <ProductRating :product-stars="product.stars" />
        </div>
        <div class="product-price-wrapper">
          <span class="money">{{ product.price | currency }}</span>
          <span
            v-if="product.origin_price !== product.price"
            class="origin-price"
          >
            <span class="money">{{ product.origin_price | currency }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import ProductRating from '@/components/frontend/products/ProductRating'

export default {
  name: 'PromoItem',
  components: {
    ProductRating
  },
  props: {
    pickProduct: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_promoItem.scss';
</style>
