<template>
  <div class="products-tab">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Content" name="content">
            <div class="content-inner">
              <h4>
                {{ newProduct.content }}
              </h4>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Information" name="info">
            <div class="content-inner">
              <table class="shop_attributes">
                <tbody>
                  <tr>
                    <th>Color :</th>
                    <td><p>Black, Blue, Gold</p></td>
                  </tr>
                  <tr>
                    <th>Size :</th>
                    <td><p>XXL, XL, L, M</p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Shipping details" name="details">
            <div class="content-inner">
              <h4>What is a Shipping Policy</h4>
              <p>
                Having a Shipping Policy is important for managing expectations
                of your customers because:
              </p>
              <ul>
                <li>
                  It lets them know how much they can expect to pay for shipping
                </li>
                <li>
                  And how long of a wait they can expect when it comes to
                  receiving their goods
                </li>
              </ul>
              <p>
                It also makes them aware of different options that are
                available.
              </p>
              <p>
                If it takes too long for a customer to figure out how much you
                charge for shipping and generally how long an item will take to
                arrive, the customer will probably buy elsewhere and you'll be
                losing business.
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsTab',
  props: {
    newProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeName: 'content'
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_productsTab.scss';
</style>
