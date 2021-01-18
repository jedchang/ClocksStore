<template>
  <div class="order-wrapper">
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
          <div class="col-lg-8 col-md-10 offset-lg-2 offset-md-1 col-12">
            <ProgressBar
              :current-progress="progressStatus"
              :current-valid="validStatus"
            ></ProgressBar>
          </div>
          <div class="col-lg-12 col-md-12 col-12">
            <UserCoupon></UserCoupon>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <ValidationObserver
              ref="observer"
              v-slot="{ invalid, handleSubmit }"
              tag="form"
            >
              <form
                class="user-order"
                @submit.prevent="handleSubmit(createOrder)"
              >
                <div class="row">
                  <div class="col-lg-7 col-md-6 col-12">
                    <div class="order-form">
                      <h2 class="order-title">Billing Details</h2>
                      <div class="form-group">
                        <label for="useremail"
                          >Email <span class="required">*</span></label
                        >
                        <ValidationProvider
                          v-slot="{ errors, classes }"
                          rules="email-required"
                        >
                          <input
                            id="useremail"
                            v-model="form.user.email"
                            type="email"
                            class="form-control"
                            name="Email"
                            placeholder="Please enter Email"
                            required
                            :class="classes"
                          />
                          <span class="text-danger">{{ errors[0] }} </span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="username"
                          >Name <span class="required">*</span></label
                        >
                        <ValidationProvider
                          v-slot="{ errors, classes }"
                          rules="name-required"
                        >
                          <input
                            id="username"
                            v-model="form.user.name"
                            type="text"
                            class="form-control"
                            name="name"
                            placeholder="Please enter Name"
                            required
                            :class="classes"
                          />
                          <span class="text-danger"> {{ errors[0] }} </span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="usertel"
                          >Phone <span class="required">*</span></label
                        >
                        <ValidationProvider
                          v-slot="{ errors, classes }"
                          rules="numeric"
                        >
                          <input
                            id="usertel"
                            v-model="form.user.tel"
                            type="tel"
                            class="form-control"
                            name="phone"
                            placeholder="Please enter Phone"
                            required
                            :class="classes"
                          />
                          <span class="text-danger"> {{ errors[0] }} </span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="useraddress"
                          >Address <span class="required">*</span></label
                        >
                        <ValidationProvider
                          v-slot="{ errors, classes }"
                          rules="addr-required"
                        >
                          <input
                            id="useraddress"
                            v-model="form.user.address"
                            type="text"
                            class="form-control"
                            name="address"
                            placeholder="Please enter Address"
                            required
                            :class="classes"
                          />
                          <span class="text-danger"> {{ errors[0] }} </span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="comment">Order Notes</label>
                        <textarea
                          id="comment"
                          v-model="form.message"
                          name=""
                          class="form-control"
                          cols="30"
                          rows="7"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-md-6 col-12">
                    <div class="order-review">
                      <h3 class="order-heading">Your Order</h3>
                      <simplebar class="simplebar">
                        <table
                          v-if="cart.carts.length !== 0"
                          class="order-table"
                          cellspacing="0"
                        >
                          <thead>
                            <tr>
                              <th class="product-name-thead">Item</th>
                              <th class="product-price-thead">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in cart.carts"
                              :key="item.id"
                              class="cart-item"
                            >
                              <td class="product-name">
                                {{ item.product.title }}
                                <span class="product-quantity"
                                  >x <span>{{ item.qty }}</span></span
                                >
                              </td>
                              <td class="product-subtotal">
                                {{ item.total | currency }}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
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
                                    <el-radio v-model="radio" label="1"
                                      >Free Shipping</el-radio
                                    >
                                  </li>
                                  <li>
                                    <el-radio v-model="radio" disabled label="2"
                                      >Flat Rate：$100</el-radio
                                    >
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr class="cart-total">
                              <th
                                :class="{
                                  'discount-title':
                                    cart.final_total !== cart.total
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
                                >
                                  {{ cart.total | currency }}
                                </span>
                              </td>
                            </tr>
                            <tr
                              v-if="cart.final_total !== cart.total"
                              class="cart-final-total"
                            >
                              <th>Final Total</th>
                              <td>
                                <span class="price-amount">
                                  {{ cart.final_total | currency }}
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                        <div v-else class="order-table-empty">
                          <div class="empty-img"></div>
                          <p class="empty-text">
                            Your cart is currently empty.
                          </p>
                        </div>
                      </simplebar>
                      <div class="order-button">
                        <button
                          class="btn btn-submit"
                          :class="{ disabled: cart.carts.length === 0 }"
                          :disabled="invalid"
                          type="submit"
                        >
                          <p v-if="status.loadingOrder === ''">Place Order</p>
                          <font-awesome-icon
                            v-else
                            :icon="['fas', 'spinner']"
                            spin
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
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
import CartSideBar from '@/components/shared/CartSideBar'
import Navbar from '@/components/shared/Navbar'
import MobileSideMenu from '@/components/shared/MobileSideMenu'
import Breadcrumb from '@/components/shared/Breadcrumb'
import LoginModal from '@/components/shared/LoginModal'
import ProgressBar from '@/components/shared/ProgressBar'
import UserCoupon from '@/components/order/UserCoupon'
import MobileScrollTop from '@/components/shared/MobileScrollTop'
import Footer from '@/components/shared/Footer'
import ScrollTop from '@/components/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import removeSettings from '@/utils/removeSettings.js'
import { mapState } from 'vuex'

export default {
  name: 'Order',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    LoginModal,
    ProgressBar,
    UserCoupon,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {
      radio: '1',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      progressStatus: 2,
      validStatus: 1
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      status: state => state.status,
      setOpacity: state => state.setOpacity
    }),
    ...mapState('cartModules', {
      cart: state => state.cart
    })
  },
  mounted() {
    this.removeSettings()
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Order')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    removeSettings,
    openModal,
    createOrder() {
      this.$store.dispatch('orderModules/createOrder', this.form)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_order.scss';
</style>
