<template>
  <section class="item">
    <h3 class="heading">
      Shipping service
    </h3>
    <p class="description">
      CLOCKS Store provide the fastest and safest shipping service.
    </p>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            Do you ship to international locations?
          </h4>
        </template>
        <div>
          Yes. Simply checkout as usual and select your country as normal.
          Delivery to EU locations is shown in the checkout. Delivery to non-EU
          locations is usually £5 extra, depending on the country. All delivery
          options are displayed in the checkout process.
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            What kind of packaging do you use to protect my watch in transit?
          </h4>
        </template>
        <div>
          For maximum protection, we use our own custom-cut cardboard boxes
          which snugly fit the boxes of all watch brands which we sell, filled
          with air bags or polystyrene. Also, we appreciate that the purchase of
          a watch is often intended as a gift, therefore all of our packaging is
          completely unbranded with no mention of Watch Shop on it.
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            Can you deliver on a Sunday?
          </h4>
        </template>
        <div>
          Unfortunately, we are unable to deliver on Sundays at this time.
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>How do you send the items?</h4>
        </template>
        <div>
          Items are shipped by Royal Mail and you also have the option in the
          checkout to use a courier if you prefer. Next day delivery is
          available on all orders. This method of delivery is fully insured.
          Certain items under £60 are sent by Royal Mail First Class Delivery by
          default, however you can always upgrade to Special Delivery in the
          checkout. 9am delivery is also available in the checkout process.
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  name: 'FaqShippingService'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_faq.scss';
</style>
