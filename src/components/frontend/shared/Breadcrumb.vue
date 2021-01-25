<template>
  <div class="breadcrumb-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="page-title">
            {{ titleName }}
          </div>
          <ul v-if="this.$route.params.id" class="bread-crumb">
            <li>
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/watches">
                Watches
              </router-link>
            </li>
            <li v-if="titleName !== 'Watches Details'" class="current">
              <p>{{ titleName }}</p>
            </li>
            <li v-else class="current">
              <p>{{ productTitle }}</p>
            </li>
          </ul>
          <ul v-else class="bread-crumb">
            <li>
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li class="current">
              <p>{{ titleName }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Breadcrumb',
  computed: {
    ...mapState('productsModules', {
      titleName: state => state.titleName,
      productTitle: state => state.productTitle
    })
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_breadcrumb.scss';
</style>
