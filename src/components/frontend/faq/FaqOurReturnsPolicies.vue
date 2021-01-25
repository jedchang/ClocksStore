<template>
  <section class="item">
    <h3 class="heading">
      Our Returns Policies
    </h3>
    <p class="description">
      CLOCKS Store operate a full 14 days refund policy, where if you change
      your mind on any purchase you can return it to us within 14 days for a
      full refund. All we ask is that the watch is returned to us unworn.
    </p>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>How do I return?</h4>
        </template>
        <div>
          Enter your order number and email address in the fields above and
          click Start. Follow the instructions and select the items you want to
          return. You will get a confirmation email with the shipping guidelines
          once the return request is approved.
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>Are there any charges for return?</h4>
        </template>
        <div>
          There are no restocking fees for returns. Original shipping charges
          are non-refundable. You are responsible for the charges of the return
          shipping.
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>How soon will I get my refund?</h4>
        </template>
        <div>
          If you're not completely satisfied withoOurs brands at any time, we
          are happy to give you a full refund. Once your return is received and
          inspected, we will send you an email to notify you that we have
          received your returned item. We will also notify you of the approval
          or rejection of your refund. If you are approved, then your refund
          will automatically be applied to the original method of payment,
          within 10 working days after CLOCKS Store receives your return.
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>Faulty items?</h4>
        </template>
        <div>
          If you experience a manufacturing fault with your item(s) within the
          first 30 days of ownership, you will be eligible to receive a
          replacement provided that you inform us within a 30 day period. If you
          experience a manufacturing fault with your item(s) and you return it
          outside of 30 days of ownership, we will require your item to be sent
          for a repair.
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  name: 'FaqProductDelivery'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_faq.scss';
</style>
