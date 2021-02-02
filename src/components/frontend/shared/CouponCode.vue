<template>
  <div
    v-if="cart.carts.length !== 0"
    class="coupon-code"
  >
    <input
      v-if="!cart.carts[0].hasOwnProperty('coupon')"
      v-model="couponCode"
      type="text"
      class="input-coupon"
      value
      placeholder="Coupon code"
    >
    <input
      v-else
      type="text"
      class="input-coupon inputted-coupon"
      :value="cart.carts[0].coupon.code"
      placeholder="Coupon code"
      disabled="disabled"
    >
    <button
      v-if="!cart.carts[0].hasOwnProperty('coupon')"
      type="submit"
      class="btn btn-submit"
      name="apple-coupon"
      value="Apply coupon"
      @click="addCouponCode"
    >
      <p v-if="status.loadingCoupon === ''">Apply coupon</p>
      <font-awesome-icon
        v-else
        :icon="['fas', 'spinner']"
        spin
      />
    </button>
    <button
      v-else
      type="submit"
      class="btn use-coupon"
      name="use-coupon"
      value="Coupon in use"
    >
      <p>Coupon in use</p>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CouponCode',
  data() {
    return {
      couponCode: ''
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
    addCouponCode() {
      if (!this.couponCode) return
      this.$store
        .dispatch('orderModules/addCouponCode', this.couponCode)
        .then(() => {
          this.$store.dispatch('cartModules/getCart')
        })
        .catch(() => {
          this.couponCode = ''
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_couponCode.scss';
</style>
