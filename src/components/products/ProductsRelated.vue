<template>
  <div class="products-related">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="title">
          <h2>Related Products</h2>
        </div>
        <div class="related-wrapper">
          <swiper
            id="swiper-related"
            ref="swiperOptions"
            :options="swiperOptions"
          >
            <div slot="btn">按鈕</div>
            <swiper-slide v-for="product in filterCategory" :key="product.id">
              <li
                :id="product.id"
                class="product-item"
                :class="{
                  'sold-out': !product.is_enabled,
                  'on-sale': product.origin_price !== product.price
                }"
              >
                <a
                  href="javascript:;"
                  class="product-img"
                  title="View"
                  @click="changeProduct(product)"
                >
                  <!-- Sold out -->
                  <div v-if="!product.is_enabled" class="sold-out-mask">
                    <div class="sold-out-text">Sold out</div>
                  </div>
                  <img :src="product.imageUrl" alt="" />
                </a>
                <div class="product-content">
                  <span> {{ product.category }} </span>
                  <h4>
                    <a
                      href="javascript:;"
                      class="name"
                      @click="changeProduct(product)"
                      >{{ product.title }}</a
                    >
                  </h4>
                  <div class="product-price-wrapper">
                    <span class="money">{{ product.price | currency }}</span>
                    <!-- 判斷原價若和售價一樣，就不顯示此欄位 -->
                    <span
                      v-if="product.origin_price !== product.price"
                      class="origin-price"
                    >
                      <span class="money">
                        {{ product.origin_price | currency }}
                      </span>
                    </span>
                  </div>
                </div>
                <div class="product-action">
                  <ProductRating :product-stars="product.stars"></ProductRating>
                  <p class="product-desc">
                    {{ product.description }}
                  </p>
                  <div class="product-btn">
                    <!-- 判斷有無加入購物車，加入按鈕顯示狀態 -->
                    <router-link
                      v-if="filterAddedCart.includes(product.id)"
                      to="/cart"
                      class="btn btn-view-cart"
                    >
                      <font-awesome-icon :icon="['fas', 'eye']" />
                      <span class="text">View Cart</span>
                    </router-link>
                    <a
                      v-else
                      href="javascript:;"
                      class="btn btn-add-cart"
                      @click="addToCart(product.id)"
                    >
                      <font-awesome-icon
                        v-if="status.loadingItem === product.id"
                        :icon="['fas', 'spinner']"
                        spin
                      />
                      <font-awesome-icon
                        v-else
                        :icon="['fas', 'shopping-cart']"
                      />
                      <span class="text">Add to Cart</span>
                    </a>
                    <!-- 判斷有無加入願望清單，加入按鈕顯示狀態 -->
                    <a
                      v-if="wishlist.indexOf(product.id) !== -1"
                      href="javascript:;"
                      class="btn btn-wishlisted"
                      @click.stop="removeWishlist(product.id)"
                    >
                      <font-awesome-icon
                        v-if="status.loadingWishlist === product.id"
                        :icon="['fas', 'spinner']"
                        spin
                      />
                      <font-awesome-icon v-else :icon="['fas', 'heart']" />
                    </a>
                    <a
                      v-else
                      href="javascript:;"
                      class="btn btn-add-wishlist"
                      @click="addToWishlist(product.id)"
                    >
                      <font-awesome-icon
                        v-if="status.loadingWishlist === product.id"
                        :icon="['fas', 'spinner']"
                        spin
                      />
                      <font-awesome-icon v-else :icon="['far', 'heart']" />
                    </a>
                  </div>
                </div>
              </li>
            </swiper-slide>
            <div slot="button-prev" class="swiper-button-prev"></div>
            <div slot="button-next" class="swiper-button-next"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ProductRating from '@/components/products/ProductRating'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProductsRelated',
  components: {
    ProductRating
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      status: state => state.status
    }),
    ...mapState('cartModules', {
      cart: state => state.cart
    }),
    ...mapState('wishlistModules', {
      wishlist: state => state.wishlist
    }),
    ...mapGetters('productsModules', ['filterCategory']),
    ...mapGetters('cartModules', ['filterAddedCart'])
  },
  created() {
    this.$store.dispatch('productsModules/getProducts')
    this.$store.dispatch('cartModules/getCart')
  },
  methods: {
    changeProduct(product) {
      this.$store.dispatch('productsModules/getChangeProduct', product)
    },
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
@import '@/assets/scss/components/_productsRelated.scss';
</style>
