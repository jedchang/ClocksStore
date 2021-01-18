<template>
  <section class="item">
    <h3 class="heading">
      Shipping, Returns and Exchanges
    </h3>
    <p class="description">
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia Curae. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet
      lacus dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est
      dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec
      vestibulum aliquam.
    </p>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            I'm an international customer, have you received my returned items?
          </h4>
        </template>
        <div>
          Praesent vitae venenatis dolor. Aenean egestas lacinia risus, id
          mattis massa interdum fringilla. Sed dictum sem at enim suscipit, eget
          aliquet tortor finibus. Integer pharetra, velit ut posuere interdum,
          orci ante feugiat mi, sit amet pulvinar dui mi ut leo. Quisque eu
          scelerisque risus. Aliquam sollicitudin, velit sed bibendum lobortis,
          ipsum odio laoreet leo, at consectetur tortor justo semper lectus.
          Nulla non eros eget urna pulvinar scelerisque in vel lacus. Donec
          suscipit dolor vitae mauris sagittis condimentum. Duis feugiat
          vehicula metus, accumsan efficitur ante bibendum a. Fusce ultrices
          justo at leo consectetur faucibus a vitae ante. Etiam eget rutrum
          quam. Proin pulvinar libero tempor, porta nunc eget, rhoncus nulla. In
          ac mauris non risus aliquam euismod ac et erat. Vestibulum vitae
          faucibus ante.
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>How can I find your international delivery policy?</h4>
        </template>
        <div>
          Duis feugiat vehicula metus, accumsan efficitur ante bibendum a. Fusce
          ultrices justo at leo consectetur faucibus a vitae ante. Etiam eget
          rutrum quam. Proin pulvinar libero tempor, porta nunc eget, rhoncus
          nulla. In ac mauris non risus aliquam euismod ac et erat. Vestibulum
          vitae faucibus ante.
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>
            What should I do if my order hasn't been delivered yet?
          </h4>
        </template>
        <div>
          Nam vitae viverra ex. Sed dictum mollis ultricies. Cras lobortis
          viverra dapibus. Suspendisse ornare metus arcu, sit amet imperdiet sem
          lacinia eget. Maecenas vitae porttitor quam. Cras lacinia sollicitudin
          felis, sit amet laoreet leo ornare vestibulum. Ut fermentum pulvinar
          lorem, vel consequat leo euismod ac. Cras pulvinar sit amet lorem nec
          egestas. Vivamus gravida eu felis in elementum. In nec pretium neque.
          Mauris dictum risus ut elit tristique dictum. Etiam tempor leo libero,
          ac commodo diam bibendum ut. Integer non dapibus diam. Morbi feugiat,
          mauris ut placerat faucibus, velit urna fermentum eros, venenatis
          finibus velit lorem vitae nulla.
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <font-awesome-icon :icon="['far', 'question-circle']" />
          <h4>What is your international returns policy?</h4>
        </template>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in
          accumsan dui. Donec imperdiet, nisl non pharetra convallis, nunc
          sapien laoreet massa, ac elementum arcu neque vitae enim. Praesent
          convallis leo est, scelerisque tincidunt magna ultricies eu. Ut
          placerat est a eros faucibus feugiat. Nullam a urna sit amet sem
          porttitor malesuada a quis nibh. In hac habitasse platea dictumst.
          Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum.
          Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus
          dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est
          dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim
          nec vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae;
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  name: 'FaqReturnsExchanges'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_faq.scss';
</style>
