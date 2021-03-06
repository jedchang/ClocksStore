<template>
  <div
    class="product-list"
    :class="{
      'sold-out': !productData.is_enabled,
      'on-sale': productData.origin_price !== productData.price
    }"
  >
    <router-link
      :to="{
        name: 'ProductsDetails',
        params: { id: productData.id }
      }"
      class="product-img"
      title="View"
    >
      <div
        v-if="!productData.is_enabled"
        class="sold-out-mask"
      >
        <div class="sold-out-text">Sold out</div>
      </div>
      <img
        :src="productData.imageUrl"
        alt="Product img"
      >
    </router-link>
    <div class="product-content">
      <span> {{ productData.category }} </span>
      <h4>
        <router-link
          :to="{
            name: 'ProductsDetails',
            params: { id: productData.id }
          }"
          class="name"
        >{{ productData.title }}</router-link>
      </h4>
      <ProductRating :product-stars="productData.stars" />
      <p class="product-desc">
        {{ productData.description }}
      </p>
      <div class="product-price-wrapper">
        <span class="money">
          {{ productData.price | currency }}
        </span>
        <span
          v-if="productData.origin_price !== productData.price"
          class="origin-price"
        >
          <span class="money">
            {{ productData.origin_price | currency }}
          </span>
        </span>
      </div>
      <div class="product-action">
        <a
          href="#"
          class="btn btn-add-cart"
          @click.prevent="addToCart(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingItem === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'shopping-cart']"
          />
          Add to Cart
        </a>
        <a
          v-if="wishLists.indexOf(productData.id) !== -1"
          href="#"
          class="btn btn-wishListsed"
          @click.prevent="removeWishLists(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingWishLists === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'heart']"
          />
        </a>
        <a
          v-else
          href="#"
          class="btn btn-add-wishLists"
          @click.prevent="addToWishLists(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingWishLists === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon
            v-else
            :icon="['far', 'heart']"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ProductRating from '@/components/frontend/products/ProductRating'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductsListMode',
  components: {
    ProductRating
  },
  props: {
    productData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapState('wishListsModules', {
      wishLists: state => state.wishLists
    }),
    ...mapGetters('cartModules', ['filterAddedCart'])
  },
  methods: {
    addToCart(id, qty = 1) {
      $('#' + id).addClass('adding-status')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
      }, 1500)
      this.$store.dispatch('cartModules/addToCart', { id, qty })
    },
    addToWishLists(id) {
      $('#' + id).addClass('adding-status')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
      }, 1500)
      this.$store.dispatch('wishListsModules/addToWishLists', id)
    },
    removeWishLists(id) {
      $('#' + id).addClass('adding-status')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
      }, 1500)
      this.$store.dispatch('wishListsModules/removeWishLists', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_productsListMode.scss';
</style>
