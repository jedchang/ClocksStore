<template>
  <div class="cart-table">
    <div class="col-lg-8 col-md-12 col-12">
      <div class="cart-inner">
        <simplebar class="simplebar">
          <table
            v-if="cart.carts.length !== 0"
            class="shop-table"
            cellspacing="0"
          >
            <thead>
              <tr class="line">
                <th class="product-thumbnail-thead">Product</th>
                <th class="product-name-thead">Name</th>
                <th class="product-price-thead">Price</th>
                <th class="product-quantity-thead">Qty</th>
                <th class="product-remove-thead">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cart.carts"
                :key="item.id"
                class="cart-item"
              >
                <td class="product-thumbnail">
                  <router-link
                    :to="{
                      name: 'ProductsDetails',
                      params: { id: item.product_id }
                    }"
                    class="product-img"
                    title="View"
                  >
                    <img
                      :src="item.product.imageUrl"
                      alt="Product img"
                    >
                  </router-link>
                  <div class="m-img-wrap">
                    <router-link
                      :to="{
                        name: 'ProductsDetails',
                        params: { id: item.product_id }
                      }"
                      class="product-img"
                      title="View"
                    >
                      <img
                        :src="item.product.imageUrl"
                        alt="Product img"
                      >
                    </router-link>
                  </div>
                  <div class="m-info-wrap">
                    <div class="m-top">
                      <router-link
                        :to="{
                          name: 'ProductsDetails',
                          params: { id: item.product_id }
                        }"
                        class="m-product-name"
                      >
                        {{ item.product.title }}
                      </router-link>
                      <span class="m-product-price">
                        {{ item.product.price | currency }}
                      </span>
                    </div>
                    <div class="m-middle">
                      <CartInputNumber
                        class="m-product-quantity"
                        :product-id="item.product_id"
                        :cart-qty="item.qty"
                      />
                    </div>
                    <div class="m-bottom">
                      <a
                        href="#"
                        class="btn-remove"
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
                    </div>
                  </div>
                </td>
                <td class="product-name">
                  <router-link
                    :to="{
                      name: 'ProductsDetails',
                      params: { id: item.product_id }
                    }"
                    class="name"
                  >
                    {{ item.product.title }}
                  </router-link>
                </td>
                <td class="product-price">
                  <span> {{ item.product.price | currency }} </span>
                </td>
                <td class="product-quantity">
                  <CartInputNumber
                    :product-id="item.product_id"
                    :cart-qty="item.qty"
                  />
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
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-else
            class="shop-table-empty"
          >
            <div class="empty-img" />
            <p class="empty-text">Your cart is currently empty.</p>
          </div>
        </simplebar>
        <CouponCode />
      </div>
      <div class="action-wrap">
        <router-link
          to="/watches"
          class="btn-action btn-continue"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
          Continue Shopping
        </router-link>
      </div>
    </div>
    <div class="col-lg-4 col-md-12 col-12">
      <div class="cart-totals-wrap">
        <div class="cart-totals">
          <h2>Cart Totals</h2>
          <table
            class="totals-table"
            cellspacing="0"
          >
            <tbody>
              <tr class="cart-subtotal">
                <th>Subtotal</th>
                <td>
                  <span class="price-amount">
                    {{ cart.total | currency }}
                  </span>
                </td>
              </tr>
              <tr class="shipping">
                <th>Shipping</th>
                <td>
                  <ul class="shipping-method">
                    <li>
                      <el-radio
                        v-model="radio"
                        label="1"
                      >Free Shipping</el-radio>
                    </li>
                    <li>
                      <el-radio
                        v-model="radio"
                        disabled
                        label="2"
                      >Flat Rate：$100</el-radio>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr class="total">
                <th
                  :class="{
                    'discount-title': cart.final_total !== cart.total
                  }"
                >
                  Total
                </th>
                <td>
                  <span
                    class="price-amount"
                    :class="{
                      discount: cart.final_total !== cart.total
                    }"
                  >{{ cart.total | currency }}</span>
                </td>
              </tr>
              <tr
                v-if="cart.final_total !== cart.total"
                class="final-total"
              >
                <th>Discount price</th>
                <td>
                  <span class="price-amount">{{
                    cart.final_total | currency
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cart-button">
          <router-link
            to="/order"
            class="btn-action btn-next"
            :class="{ disabled: cart.carts.length === 0 }"
          >
            Next Step
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CouponCode from '@/components/frontend/shared/CouponCode'
import CartInputNumber from '@/components/frontend/cart/CartInputNumber'
import { mapState } from 'vuex'

export default {
  name: 'CartTable',
  components: {
    CouponCode,
    CartInputNumber
  },
  data() {
    return {
      radio: '1'
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapState('cartModules', {
      cart: state => state.cart
    })
  },
  methods: {
    removeCartItem(id) {
      this.$store.dispatch('cartModules/removeCartItem', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_cartTable.scss';
</style>
