<template>
  <div class="watches-details-wrapper">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes" />
              <div class="hours" />
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <MobileSideMenu />
    <div class="content-wrapper">
      <CartSideBar />
      <Navbar
        :active-state="true"
        @open-modal="openModal"
      />
      <Breadcrumb />
      <div class="container page-container">
        <div class="products-spec">
          <div class="row">
            <div class="col-lg-6 col-md-5 col-12">
              <div
                class="details-large"
                :class="{
                  'on-sale': newProduct.origin_price !== newProduct.price
                }"
              >
                <img
                  :src="newProduct.imageUrl"
                  alt="Product img"
                >
              </div>
            </div>
            <div class="col-lg-6 col-md-7 col-12">
              <div class="details-content">
                <div class="details-top">
                  <h2 class="name">{{ newProduct.title }}</h2>
                  <ProductRating :product-stars="newProduct.stars" />
                  <ul class="details-list">
                    <li>
                      <span>Brand :</span>
                      <p>Apple</p>
                    </li>
                    <li>
                      <span>Type :</span>
                      <p>{{ newProduct.category }}</p>
                    </li>
                    <li>
                      <span>Availability :</span>
                      <p>In Stock</p>
                    </li>
                  </ul>
                  <div class="details-price-wrapper">
                    <span class="money">
                      {{ newProduct.price | currency }}
                    </span>
                    <span
                      v-if="newProduct.origin_price !== newProduct.price"
                      class="origin-price"
                    >
                      <span class="money">
                        {{ newProduct.origin_price | currency }}
                      </span>
                    </span>
                  </div>
                </div>
                <div class="details-middle">
                  <div class="details-action-wrapper">
                    <el-input-number
                      v-model="quantity"
                      :class="{
                        disabled: filterAddedCart.includes(newProduct.id)
                      }"
                      :min="1"
                      :max="99"
                    />
                    <div class="details-action-btns">
                      <router-link
                        v-if="filterAddedCart.includes(newProduct.id)"
                        to="/cart"
                        class="btn btn-view-cart"
                      >
                        <font-awesome-icon :icon="['fas', 'eye']" />
                        View Cart
                      </router-link>
                      <a
                        v-else
                        href="#"
                        class="btn btn-add-cart"
                        @click.prevent="addToCart(newProduct.id, quantity)"
                      >
                        <font-awesome-icon
                          v-if="status.loadingItem === ''"
                          :icon="['fas', 'shopping-cart']"
                        />
                        <font-awesome-icon
                          v-if="status.loadingItem === newProduct.id"
                          :icon="['fas', 'spinner']"
                          spin
                        />
                        Add to Cart
                      </a>
                      <a
                        v-if="wishlist.indexOf(newProduct.id) !== -1"
                        href="#"
                        class="btn btn-wishlisted"
                        @click.stop="removeWishlist(newProduct.id)"
                      >
                        <font-awesome-icon
                          v-if="status.loadingWishlist === newProduct.id"
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
                        class="btn btn-add-wishlist"
                        @click.prevent="addToWishlist(newProduct.id)"
                      >
                        <font-awesome-icon
                          v-if="status.loadingWishlist === newProduct.id"
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
                <div class="details-bottom">
                  <p>Share This :</p>
                  <ul class="share-link">
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        class="icon-link icon-facebook"
                      >
                        <font-awesome-icon :icon="['fab', 'facebook-f']" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/?lang=zh-tw"
                        target="_blank"
                        class="icon-link icon-twitter"
                      >
                        <font-awesome-icon :icon="['fab', 'twitter']" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tw.linkedin.com/"
                        target="_blank"
                        class="icon-link icon-linkedin"
                      >
                        <font-awesome-icon :icon="['fab', 'linkedin-in']" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.pinterest.com/"
                        target="_blank"
                        class="icon-link icon-pinterest"
                      >
                        <font-awesome-icon :icon="['fab', 'pinterest']" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductsTab :new-product="newProduct" />
        <ProductsRelated />
      </div>
      <MobileScrollTop />
      <Footer />
      <ScrollTop />
      <LoginModal />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import CartSideBar from '@/components/frontend/shared/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import ProductRating from '@/components/frontend/products/ProductRating'
import LoginModal from '@/components/frontend/shared/LoginModal'
import ProductsTab from '@/components/frontend/products/ProductsTab'
import ProductsRelated from '@/components/frontend/products/ProductsRelated'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import removeSettings from '@/utils/removeSettings.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductsDetails',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    ProductRating,
    LoginModal,
    ProductsTab,
    ProductsRelated,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {
      productQty: 1,
      quantity: '1',
      activeName: 'content'
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      status: (state) => state.status,
      setOpacity: (state) => state.setOpacity
    }),
    ...mapState('cartModules', {
      cart: (state) => state.cart
    }),
    ...mapState('productsModules', {
      product: (state) => state.product,
      newProducts: (state) => state.newProducts,
      productTitle: (state) => state.productTitle
    }),
    ...mapState('wishlistModules', {
      wishlist: (state) => state.wishlist
    }),
    ...mapGetters('productsModules', ['newProducts']),
    ...mapGetters('cartModules', ['filterAddedCart']),

    newProduct() {
      const newObj = {}
      const key = 'stars'
      let value = this.productTitle.substr(8, 1)
      if (value === '1' || value === '8') {
        value = 3
      } else if (value === '2' || value === '7') {
        value = 5
      } else if (value === '3' || value === '6') {
        value = 4
      } else if (value === '4' || value === '5') {
        value = 3.5
      } else if (value === '0' || value === '9') {
        value = 4.5
      } else {
        value = 2
      }
      newObj[key] = value
      return Object.assign(newObj, this.product)
    }
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('productsModules/getProduct', this.$route.params.id)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Watches Details')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  mounted() {
    this.removeSettings()
  },
  methods: {
    removeSettings,
    openModal,
    addToCart(id, qty = 1) {
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
@import '@/assets/scss/components/_inputNumber.scss';
@import '@/assets/scss/page/_productsDetails.scss';
</style>
