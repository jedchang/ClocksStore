<template>
  <div
    v-if="cart.carts.length !== 0"
    class="user-coupon"
  >
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <div class="title-inner">
            <img
              src="~@/assets/images/icon_coupon.svg"
              alt="Coupon icon"
              class="icon-coupon"
            >
            <h3>
              <span class="main-text">Have A Coupon?</span>
              <span class="text">Click Here To Enter Your Code.</span>
            </h3>
          </div>
        </template>
        <CouponCode />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import CouponCode from '@/components/frontend/shared/CouponCode'
import { mapState } from 'vuex'

export default {
  name: 'UserCoupon',
  components: {
    CouponCode
  },
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
          this.couponCode = ''
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
@import '@/assets/scss/components/_userCoupon.scss';
</style>
