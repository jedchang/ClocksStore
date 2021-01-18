<template>
  <div class="ad-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="ad-box">
            <div class="ad-label">Exclusive Deal</div>
            <h2 class="ad-name">25% Off on All products at CLOCKS Store</h2>
            <p class="ad-text">
              Get an incredible 25% discount on all types of watches at CLOCKS
              Store. Only for single use.
            </p>
            <button
              v-clipboard:copy="couponCode"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              type="button"
              class="btn btn-coupon"
            >
              <span class="text">Get Coupon Code</span>
              <span class="material-icons">
                content_cut
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdArea',
  data() {
    return {
      couponCode: 'Coupon520'
    }
  },
  methods: {
    onCopy(e) {
      this.$store.dispatch(
        'alertModules/pushMessages',
        this.$message({
          showClose: true,
          message: 'You just copied: ' + e.text,
          type: 'success'
        }),
        { root: true }
      )
    },
    onError: function() {
      this.$store.dispatch(
        'alertModules/pushMessages',
        this.$message({
          showClose: true,
          message: ' Failed to copy Coupon',
          type: 'error'
        }),
        { root: true }
      )
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adArea.scss';
</style>
