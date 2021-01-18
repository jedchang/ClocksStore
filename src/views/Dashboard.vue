<template>
  <div class="dashboard-wrapper">
    <AdminMobileMenu></AdminMobileMenu>
    <AdminNavbar></AdminNavbar>
    <AlertMessage></AlertMessage>
    <AdminSidebar></AdminSidebar>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <footer class="admin-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="footer-inner">
              <p class="text copyright">
                © CLOCKS Store. All Rights Reserved.
              </p>
              <p class="text author">
                Develop by
                <a href="mailto://march.24@gmail.com" target="_blank"
                  >Jed Chang</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminNavbar from '@/components/admin/AdminNavbar'
import AdminMobileMenu from '@/components/admin/AdminMobileMenu'
import AlertMessage from '@/components/shared/AlertMessage'

export default {
  name: 'Dashboard',
  components: {
    AdminSidebar,
    AdminNavbar,
    AdminMobileMenu,
    AlertMessage
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = `${token}`
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_dashboard.scss';
</style>
