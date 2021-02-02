<template>
  <section class="item">
    <h3 class="heading">
      Purchase problem
    </h3>
    <p class="description">
      On CLOCKS, we assure you the premium quality products from the premium
      brands in Switzerland. Every watch that you buy online here on our website
      has been designed by their manufacturers keeping in mind the comfort of
      the end consumer. Made out of tough and genuine quality material, every
      product score high on durability.
    </p>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>Why are your prices so low?</h4>
        </template>
        <div>
          CLOCKS Store delivers thousands of watches to customers every day in
          an absolutely efficient manner, enabling us under certain
          circumstances to offer special offers and exclusives.
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            Are batteries included in the watches?
          </h4>
        </template>
        <p>
          Yes, brand new batteries are included in all watches. These are fitted
          at the factory by the manufacturer - your watch is ready to wear as
          soon as you receive it.
        </p>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            Do you sell secondhand watches?
          </h4>
        </template>
        <p>
          No. We only sell 100% brand new goods.
        </p>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            Do your watches come with guarantees?
          </h4>
        </template>
        <div>
          Yes, all of our watches come with the full international
          manufacturer's guarantee with our official distributor's stamp. You
          can purchase from us assured with the knowledge that your watch is
          fully guaranteed for the full period against workmanship faults.
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  name: 'FaqPurchaseProblem'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_faq.scss';
</style>
