<template>
  <div class="checkout-wrapper">
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
          <div class="col-lg-8 col-md-10 offset-lg-2 offset-md-1 col-12">
            <ProgressBar
              v-if="order.is_paid === false"
              :current-progress="progressStatus"
              :current-valid="validStatus"
            />
          </div>
          <div class="col-lg-12 col-md-12 col-12">
            <div class="cart-inner">
              <form
                v-if="order.is_paid === false"
                @submit.prevent="payOrder"
              >
                <table
                  class="shop-table"
                  cellspacing="0"
                >
                  <thead>
                    <tr class="line">
                      <th class="product-thumbnail-thead">Product</th>
                      <th class="product-name-thead">Name</th>
                      <th class="product-price-thead">Price</th>
                      <th class="product-quantity-thead">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in order.products"
                      :key="item.id"
                      class="cart-item"
                    >
                      <td class="product-thumbnail">
                        <img
                          :src="item.product.imageUrl"
                          alt="Product img"
                        >
                        <ul class="m-lists">
                          <li class="m-product-name">
                            <span>Name<b>：</b></span>
                            <p>{{ item.product.title }}</p>
                          </li>
                          <li class="m-product-price">
                            <span>Price<b>：</b></span>
                            <p>{{ item.product.price | currency }}</p>
                          </li>
                          <li class="m-product-qty">
                            <span>Qty<b>：</b></span>
                            <p>{{ item.qty }}</p>
                          </li>
                        </ul>
                      </td>
                      <td class="product-name">
                        <span>{{ item.product.title }}</span>
                      </td>
                      <td class="product-price">
                        <span> {{ item.product.price | currency }} </span>
                      </td>
                      <td class="product-quantity">
                        <span>{{ item.qty }}</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="cart-total">
                      <th
                        class="cart-total-thead"
                        colspan="3"
                      >Total</th>
                      <td>
                        <span class="price-amount">{{
                          order.total | currency
                        }}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <table
                  class="info-table"
                  cellspacing="0"
                >
                  <tbody>
                    <tr class="info-item">
                      <th class="info-email-thead">Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr class="info-item">
                      <th class="info-name-thead">Name</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr class="info-item">
                      <th class="info-tel-thead">Tel</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr class="info-item">
                      <th class="info-address-thead">Address</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr class="info-item">
                      <th class="info-payment-thead">Payment Status</th>
                      <td>
                        <span
                          v-if="!order.is_paid"
                          class="badge badge-pill badge-danger"
                        >Not yet paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="action-button checkout-button">
                  <button
                    type="button"
                    class="btn btn-cancel"
                    @click="cancelOrder"
                  >
                    Cancel order
                  </button>
                  <button class="btn btn-checkout">
                    <p v-if="status.loadingOrder === ''">Proceed to Checkout</p>
                    <font-awesome-icon
                      v-else
                      class="icon-spinner"
                      :icon="['fas', 'spinner']"
                      spin
                    />
                  </button>
                </div>
              </form>
              <div
                v-if="order.is_paid === true"
                class="completed-wrap"
              >
                <div class="completed">
                  <img src="~@/assets/images/completed_thanks_text.svg">
                  <div class="order-id">
                    <p>
                      Order: <span>{{ orderId }} </span>
                    </p>
                    <span
                      v-if="order.is_paid"
                      class="badge badge-pill badge-success"
                    >Payment completed</span>
                  </div>
                  <ul class="thanks-text">
                    <li>Thanks for being awesome,</li>
                    <li>we hope you enjoy your purchase!</li>
                  </ul>
                </div>
                <button
                  v-if="order.is_paid"
                  type="button"
                  class="btn btn-continue"
                  @click="continueShop"
                >
                  <font-awesome-icon :icon="['fas', 'chevron-left']" />
                  Continue Shop
                </button>
              </div>
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
import CartSideBar from '@/components/frontend/shared/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import LoginModal from '@/components/frontend/shared/LoginModal'
import ProgressBar from '@/components/frontend/shared/ProgressBar'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState } from 'vuex'

export default {
  name: 'Checkout',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    LoginModal,
    ProgressBar,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {
      orderId: '',
      progressStatus: 3,
      validStatus: 2
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      status: state => state.status,
      setOpacity: state => state.setOpacity
    }),
    ...mapState('orderModules', {
      order: state => state.order
    })
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Checkout')
    this.orderId = this.$route.params.orderId
    this.$store.dispatch('orderModules/getOrder', this.orderId)
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal,
    payOrder() {
      this.$store.dispatch('orderModules/payOrder', this.orderId).then(() => {
        this.$store.dispatch('orderModules/getOrder', this.orderId)
      })
    },
    cancelOrder() {
      this.$store.dispatch(
        'alertModules/pushMessages',
        this.$message({
          showClose: true,
          message: 'Order cancelled',
          type: 'success'
        })
      )
      this.$router.push('/')
    },
    continueShop() {
      if (this.order.is_paid) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_checkout.scss';
</style>
