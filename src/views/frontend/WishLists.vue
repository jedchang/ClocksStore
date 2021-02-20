<template>
  <div class="wrapper wishLists-wrapper">
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
      <Navbar @open-modal="openModal" />
      <Breadcrumb />
      <div class="container page-container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="wishLists-inner">
              <simplebar class="simplebar">
                <table
                  v-if="wishLists.length !== 0"
                  class="wishLists-table"
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
                      v-for="product in wishListsProducts"
                      :key="product.id"
                      class="wishLists-item"
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
                          <img
                            :src="product.imageUrl"
                            alt="Product img"
                          >
                        </router-link>
                      </td>
                      <td class="product-name">
                        <router-link
                          :to="{
                            name: 'ProductsDetails',
                            params: { id: product.id }
                          }"
                          class="name"
                        >{{ product.title }}</router-link>
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
                        <span
                          v-else
                          class="out-stock badge badge-pill"
                        >
                          out stock
                        </span>
                      </td>
                      <td class="product-cart">
                        <a
                          href="#"
                          class="btn btn-add-cart"
                          @click.prevent="addToCart(product.id)"
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
                            href="#"
                            class="btn-remove"
                            @click.prevent="removeWishLists(product.id)"
                          >
                            <font-awesome-icon
                              v-if="status.loadingWishLists === product.id"
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
                <div
                  v-else
                  class="wishLists-table-empty"
                >
                  <div class="empty-img" />
                  <p class="empty-text">Your wish lists is currently empty.</p>
                  <router-link
                    to="/watches"
                    class="btn-action btn-continue"
                  >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    Continue Shopping
                  </router-link>
                </div>
              </simplebar>
            </div>
          </div>
        </div>
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
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'WishLists',
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
      isLoading: (state) => state.isLoading,
      status: (state) => state.status,
      setOpacity: (state) => state.setOpacity
    }),
    ...mapState('cartModules', {
      cart: (state) => state.cart
    }),
    ...mapState('wishListsModules', {
      wishLists: (state) => state.wishLists
    }),
    ...mapGetters('cartModules', ['filterAddedCart']),
    ...mapGetters('wishListsModules', ['wishListsProducts'])
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'WishLists')
    this.$store.dispatch('productsModules/getProducts')
    this.$store.commit('wishListsModules/GET_WISHLISTS')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal,
    addToCart(id, qty = 1) {
      $('#' + id).addClass('adding-status')
      this.$store.dispatch('cartModules/addToCart', { id, qty })
      this.$store.commit('wishListsModules/GET_WISHLISTS')
      setTimeout(() => {
        $('#' + id).removeClass('adding-status')
        this.$store.commit('wishListsModules/REMOVE_WISHLISTS', id)
      }, 1500)
    },
    removeWishLists(id) {
      this.$store.dispatch('wishListsModules/removeWishLists', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_wishLists.scss';
</style>
