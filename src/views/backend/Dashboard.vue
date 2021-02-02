<template>
  <div class="dashboard-wrapper">
    <AdminMobileMenu />
    <AdminNavbar />
    <AlertMessage />
    <AdminSidebar />
    <div class="main-content">
      <router-view />
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
                <a
                  href="mailto://march.24@gmail.com"
                  target="_blank"
                >Jed Chang</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AdminSidebar from '@/components/backend/shared/AdminSidebar'
import AdminNavbar from '@/components/backend/shared/AdminNavbar'
import AdminMobileMenu from '@/components/backend/shared/AdminMobileMenu'
import AlertMessage from '@/components/frontend/shared/AlertMessage'

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
