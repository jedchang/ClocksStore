<template>
  <div class="sidebar-content">
    <div class="sidebar-menu">
      <ul class="menu-wrapper">
        <li class="menu-title">Home</li>
        <li class="menu-item">
          <router-link
            to="/index"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas', 'store']" />
            <span>Store</span>
          </router-link>
        </li>
        <li class="menu-title title-admin">administrator</li>
        <li class="menu-item">
          <router-link
            to="/admin/products"
            class="nav-link"
            :class="{ active: current === 'products' }"
            @click.native="current = 'products'"
          >
            <font-awesome-icon :icon="['fas', 'list-alt']" />
            <span>Products</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link
            to="/admin/orders"
            class="nav-link"
            :class="{ active: current === 'orders' }"
            @click.native="current = 'orders'"
          >
            <font-awesome-icon :icon="['fas', 'clipboard-check']" />
            <span>Orders</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link
            to="/admin/coupons"
            class="nav-link"
            :class="{ active: current === 'coupons' }"
            @click.native="current = 'coupons'"
          >
            <font-awesome-icon :icon="['fas', 'gift']" />
            <span>Coupons</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar',
  data() {
    return {
      current: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminSidebar.scss';
</style>
