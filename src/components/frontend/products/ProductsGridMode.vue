<template>
  <div
    :id="productData.id"
    class="product-grid"
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
      :class="{
        'router-link-exact-active': $route.meta.active === '/watches/:id'
      }"
      class="product-img"
      title="View"
    >
      <div v-if="!productData.is_enabled" class="sold-out-mask">
        <div class="sold-out-text">Sold out</div>
      </div>
      <img :src="productData.imageUrl" alt="Product img" />
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
          >{{ productData.title }}</router-link
        >
      </h4>
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
    </div>
    <div class="product-action">
      <ProductRating :product-stars="productData.stars"></ProductRating>
      <p class="product-desc">
        {{ productData.description }}
      </p>
      <div class="product-btn">
        <router-link
          v-if="filterAddedCart.includes(productData.id)"
          to="/cart"
          class="btn btn-view-cart"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
          <span class="text">View Cart</span>
        </router-link>
        <a
          v-else
          href="#"
          class="btn btn-add-cart"
          @click.prevent="addToCart(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingItem === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon v-else :icon="['fas', 'shopping-cart']" />
          <span class="text">Add to Cart</span>
        </a>
        <a
          v-if="wishlist.indexOf(productData.id) !== -1"
          href="#"
          class="btn btn-wishlisted"
          @click.stop="removeWishlist(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingWishlist === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon v-else :icon="['fas', 'heart']" />
        </a>
        <a
          v-else
          href="#"
          class="btn btn-add-wishlist"
          @click.prevent="addToWishlist(productData.id)"
        >
          <font-awesome-icon
            v-if="status.loadingWishlist === productData.id"
            :icon="['fas', 'spinner']"
            spin
          />
          <font-awesome-icon v-else :icon="['far', 'heart']" />
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
  name: 'ProductsGridMode',
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
    ...mapState('wishlistModules', {
      wishlist: state => state.wishlist
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
    addToWishlist(id) {
      $('#' + id).addClass('adding-status')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
      }, 1500)
      this.$store.dispatch('wishlistModules/addToWishlist', id)
    },
    removeWishlist(id) {
      $('#' + id).addClass('adding-status')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
      }, 1500)
      this.$store.dispatch('wishlistModules/removeWishlist', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_productsGridMode.scss';
</style>
