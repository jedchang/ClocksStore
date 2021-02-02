<template>
  <div class="admin-breadcrumb">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="breadcrumb-wrap">
            <div class="page-title">
              {{ titleName }}
            </div>
            <ul
              v-if="this.$route.params.id"
              class="bread-crumb"
            >
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
              <li
                v-if="titleName !== 'Watches Details'"
                class="current"
              >
                <p>{{ titleName }}</p>
              </li>
              <li
                v-else
                class="current"
              >
                <p>{{ productTitle }}</p>
              </li>
            </ul>
            <ul
              v-else
              class="bread-crumb"
            >
              <li>
                <router-link to="/">
                  Administrator
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
  </div>
</template>

<script>
export default {
  name: 'AdminBreadcrumb',
  props: {
    titleName: {
      type: String,
      required: true
    },
    productTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminBreadcrumb.scss';
</style>
