<template>
  <div class="cart">
    <div
      id="cart-sidebar"
      class="cart-sidebar"
      :class="{ open: isOpen }"
    >
      <simplebar class="simplebar">
        <div class="cart-header">
          <div class="cart-icon icon">
            <span
              v-if="cart.carts.length > 0"
              id="cart-total"
              class="cart-total count"
            >
              {{ cart.carts.length }}
            </span>
          </div>
          <h2 class="cart-title">Shopping cart</h2>
          <a
            href="#"
            class="btn btn-close"
            @click.prevent="closeCart"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </a>
          <a
            href="#"
            class="btn btn-close-mobile"
            @click.prevent="closeCart"
          >
            <svg
              class="hamburger"
              viewBox="0 0 100 100"
            >
              <path
                class="line top"
                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
              />
              <path
                class="line middle"
                d="m 30,50 h 40"
              />
              <path
                class="line bottom"
                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
              />
            </svg>
          </a>
        </div>
        <div
          v-if="cart.carts.length !== 0"
          class="cart-content"
        >
          <ul class="cart-product-list">
            <li
              v-for="item in cart.carts"
              :key="item.id"
              class="cart-product-item"
            >
              <router-link
                :to="{
                  name: 'ProductsDetails',
                  params: { id: item.product_id }
                }"
                class="cart-product-thumbnail"
              >
                <img
                  :src="item.product.imageUrl"
                  alt="Cart product img"
                >
              </router-link>
              <div class="cart-product-name">
                <h4>
                  <router-link
                    :to="{
                      name: 'ProductsDetails',
                      params: { id: item.product_id }
                    }"
                    class="cart-model-name"
                  >{{ item.product.title }}</router-link>
                </h4>
                <div class="qty-price">
                  <span class="qty">{{ item.qty }}</span> x
                  <p class="price">
                    {{ item.product.price | currency }}
                  </p>
                </div>
              </div>
              <div class="cart-product-remove">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Remove"
                  placement="top"
                >
                  <a
                    href="#"
                    class="btn btn-remove"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <font-awesome-icon
                      v-if="status.loadingItem === item.id"
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
              </div>
            </li>
          </ul>
          <div class="cart-actions">
            <div class="total">
              <div class="subtotal">Subtotal</div>
              <div class="amount">
                {{ cart.total | currency }}
              </div>
            </div>
            <div class="buttons">
              <router-link
                to="/cart"
                class="btn btn-view-cart"
                :class="{
                  disabled:
                    this.$route.path === '/cart' ||
                    this.$route.path === '/order'
                }"
              >
                View Cart
              </router-link>
              <router-link
                to="/order"
                class="btn btn-checkout"
                :class="{ disabled: this.$route.path === '/order' }"
              >
                Check out
              </router-link>
            </div>
          </div>
        </div>
        <div
          v-else
          class="cart-content-empty"
        >
          <div class="empty-list">
            <div class="empty-img" />
            <p class="empty-text">Your cart is currently empty.</p>
          </div>
        </div>
      </simplebar>
    </div>
    <div
      class="cart-sidebar-overlay"
      @click="closeCart"
    />
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState } from 'vuex'

export default {
  name: 'CartSideBar',
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      status: state => state.status
    }),
    ...mapState('cartModules', {
      cart: state => state.cart,
      isOpen: state => state.isOpen
    })
  },
  created() {},
  methods: {
    closeCart() {
      this.$store.commit('cartModules/OPEN_CART', false)
    },
    getCart() {
      this.$store.dispatch('cartModules/getCart')
      $('#cart-total').addClass('count')
    },
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_cartSideBar.scss';
</style>
