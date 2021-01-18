<template>
  <div class="wrapper wishlist-wrapper">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes"></div>
              <div class="hours"></div>
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <MobileSideMenu></MobileSideMenu>
    <div class="content-wrapper">
      <CartSideBar></CartSideBar>
      <Navbar @open-modal="openModal"></Navbar>
      <Breadcrumb></Breadcrumb>
      <div class="container page-container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="wishlist-inner">
              <simplebar class="simplebar">
                <table
                  v-if="wishlist.length !== 0"
                  class="wishlist-table"
                  cellspacing="0"
                >
                  <thead>
                    <tr class="line">
                      <th class="product-thumbnail-thead">Product</th>
                      <th class="product-name-thead">Name</th>
                      <th class="product-price-thead">Price</th>
                      <th class="product-status-thead">Stock Status</th>
                      <th class="product-cart-thead">Add to Cart</th>
                      <th class="product-remove-thead">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="product in wishlistProducts"
                      :key="product.id"
                      class="wishlist-item"
                      :class="{ 'sold-out': product.is_enabled === 0 }"
                    >
                      <td class="product-thumbnail">
                        <router-link
                          :to="{
                            name: 'ProductsDetails',
                            params: { id: product.id }
                          }"
                          :class="{
                            'router-link-exact-active':
                              $route.meta.active === '/watches/:id'
                          }"
                          class="product-img"
                          title="View"
                        >
                          <img :src="product.imageUrl" alt="" />
                        </router-link>
                      </td>
                      <td class="product-name">
                        <router-link
                          :to="{
                            name: 'ProductsDetails',
                            params: { id: product.id }
                          }"
                          class="name"
                          >{{ product.title }}</router-link
                        >
                      </td>
                      <td class="product-price">
                        <span> {{ product.price | currency }} </span>
                      </td>
                      <td class="product-status">
                        <span
                          v-if="product.is_enabled === 1"
                          class="in-stock badge badge-pill"
                        >
                          in stock
                        </span>
                        <span v-else class="out-stock badge badge-pill">
                          out stock
                        </span>
                      </td>
                      <td class="product-cart">
                        <router-link
                          v-if="filterAddedCart.includes(product.id)"
                          to="/cart"
                          class="btn btn-view-cart"
                        >
                          <font-awesome-icon :icon="['fas', 'eye']" />
                          View Cart
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
                          Add to Cart
                        </a>
                      </td>
                      <td class="product-remove">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Remove"
                          placement="top"
                        >
                          <a
                            href="javascript:;"
                            class="btn-remove"
                            @click="removeWishlist(product.id)"
                          >
                            <font-awesome-icon
                              v-if="status.loadingWishlist === product.id"
                              class="icon-spinner"
                              :icon="['fas', 'spinner']"
                              spin
                            />
                            <font-awesome-icon
                              v-else
                              :icon="['far', 'trash-alt']"
                            />
                          </a>
                        </el-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="wishlist-table-empty">
                  <div class="empty-img"></div>
                  <p class="empty-text">Your wishlist is currently empty.</p>
                  <router-link to="/watches" class="btn-action btn-continue">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    Continue Shopping
                  </router-link>
                </div>
              </simplebar>
            </div>
          </div>
        </div>
      </div>
      <MobileScrollTop></MobileScrollTop>
      <Footer></Footer>
      <ScrollTop></ScrollTop>
      <LoginModal></LoginModal>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import CartSideBar from '@/components/shared/CartSideBar'
import Navbar from '@/components/shared/Navbar'
import MobileSideMenu from '@/components/shared/MobileSideMenu'
import Breadcrumb from '@/components/shared/Breadcrumb'
import LoginModal from '@/components/shared/LoginModal'
import MobileScrollTop from '@/components/shared/MobileScrollTop'
import Footer from '@/components/shared/Footer'
import ScrollTop from '@/components/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Wishlist',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    LoginModal,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      status: state => state.status,
      setOpacity: state => state.setOpacity
    }),
    ...mapState('cartModules', {
      cart: state => state.cart
    }),
    ...mapState('wishlistModules', {
      wishlist: state => state.wishlist
    }),
    ...mapGetters('cartModules', ['filterAddedCart']),
    ...mapGetters('wishlistModules', ['wishlistProducts'])
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Wishlist')
    this.$store.dispatch('productsModules/getProducts')
    this.$store.commit('wishlistModules/GET_WISHLIST')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal,
    addToCart(id, qty = 1) {
      $('#' + id).addClass('adding-status')
      this.$store.dispatch('cartModules/addToCart', { id, qty })
      this.$store.commit('wishlistModules/GET_WISHLIST')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
        this.$store.commit('wishlistModules/REMOVE_WISHLIST', id)
      }, 1500)
    },
    removeWishlist(id) {
      this.$store.dispatch('wishlistModules/removeWishlist', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_wishlist.scss';
</style>
