<template>
  <div>
    <el-input-number
      v-model="qty"
      :min="1"
      :max="99"
      @keyup.enter="changeCartQty(id,qty)"
      @change="changeCartQty(id,qty)"
    />
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'CartInputNumber',
  props: {
    productId: {
      type: String,
      default: ''
    },
    cartQty: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      id: this.productId,
      qty: this.cartQty
    }
  },
  methods: {
    changeCartQty(id, qty) {
      const vm = this
      vm.$nextTick(() => {
        $('.el-input-number span').off('mouseup').on('mouseup', function () {
          vm.$store.dispatch('cartModules/changeCartQty', { id, qty })
        })
        $('.el-input-number input').on('keyup', function() {
          vm.$store.dispatch('cartModules/changeCartQty', { id, qty })
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/components/_inputNumber.scss';
</style>
