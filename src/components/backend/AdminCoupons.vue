<template>
  <div class="coupons-content">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes" />
              <div class="hours" />
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <AdminBreadcrumb :title-name="titleName" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="btn-wrap">
                <button
                  type="button"
                  class="btn btn-add-product rounded-pill"
                  @click="openCouponModal(true)"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  Create a new coupon
                </button>
              </div>
              <simplebar class="simplebar">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th class="coupon-name-thead">Coupon Name</th>
                      <th class="discount-percent-thead">
                        Discount percentage
                      </th>
                      <th class="expiry-date-thead">Expiry date</th>
                      <th class="state-thead">State</th>
                      <th class="options-thead">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in coupons"
                      :key="item.id"
                    >
                      <td class="coupon-name">{{ item.title }}</td>
                      <td class="discount-percent">{{ item.percent }}%</td>
                      <td class="expiry-date">{{ item.due_date | date }}</td>
                      <td class="state">
                        <span
                          v-if="item.is_enabled"
                          class="badge badge-pill badge-success"
                        >Enable</span>
                        <span
                          v-else
                          class="badge badge-pill badge-danger"
                        >Disable</span>
                      </td>
                      <td class="options">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Edit"
                          placement="top"
                        >
                          <a
                            href="#"
                            class="btn-edit"
                            @click.prevent="openCouponModal(false, item)"
                          >
                            <font-awesome-icon :icon="['fas', 'pen']" />
                          </a>
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Remove"
                          placement="top"
                        >
                          <a
                            href="#"
                            class="btn-remove"
                            @click.prevent="removeModal(item)"
                          >
                            <font-awesome-icon :icon="['fas', 'trash-alt']" />
                          </a>
                        </el-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </simplebar>
              <Pagination
                :paging-content="pagination"
                @changePaging="getCoupons"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="couponModalLabel"
              class="modal-title"
            >
              New coupon
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-12">
                <div class="form-group">
                  <label for="title">Coupon Name</label>
                  <input
                    id="title"
                    v-model="tempCoupon.title"
                    type="text"
                    class="form-control"
                    placeholder="Please enter coupon mame"
                  >
                </div>
                <div class="form-group">
                  <label for="coupon-code">Coupon Code</label>
                  <input
                    id="coupon-code"
                    v-model="tempCoupon.code"
                    type="text"
                    class="form-control"
                    placeholder="Please enter coupon code"
                  >
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-12">
                <div class="form-group">
                  <label for="due-date">Expiry date</label>
                  <input
                    id="due-date"
                    v-model="due_date"
                    type="date"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label for="price">Discount percentage</label>
                  <input
                    id="price"
                    v-model="tempCoupon.percent"
                    type="number"
                    class="form-control"
                    placeholder="Please enter discount percentage"
                  >
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-12">
                <div class="form-group">
                  <div class="form-check">
                    <el-checkbox
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >Enable</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary btn-confirm"
              @click="updateCoupon"
            >
              <font-awesome-icon :icon="['fas', 'check']" />
              Update coupon
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="removeCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="removeCouponLabel"
              class="modal-title"
            >
              Remove Coupon
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Remove or Not
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            Coupon (cannot be restored after removal)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger btn-confirm"
              @click="removeCoupon"
            >
              <font-awesome-icon :icon="['fas', 'check']" />
              Confirm removal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import formatDate from '@/utils/formatDate'
import AdminBreadcrumb from '@/components/backend/shared/AdminBreadcrumb'
import Pagination from '@/components/backend/shared/Pagination'
import removeSettings from '@/utils/removeSettings.js'
import { mapState } from 'vuex'

export default {
  name: 'AdminCoupons',
  components: {
    AdminBreadcrumb,
    Pagination
  },
  data() {
    return {
      titleName: 'Coupons',
      coupons: {},
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      isNew: false,
      status: {
        fileUploading: false
      },
      due_date: formatDate()
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      setOpacity: (state) => state.setOpacity
    })
  },
  watch: {
    due_date() {
      const vm = this
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  created() {
    this.getCoupons()
  },
  mounted() {
    this.removeSettings()
  },
  methods: {
    removeSettings,
    getCoupons(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      this.$store.commit('LOADING', true, { root: true })
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        this.$store.commit('LOADING', false, { root: true })
      })
    },
    openCouponModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({ ...item })
        this.isNew = false
      }
      $('#couponModal').modal('show')
      $('body').removeAttr('style class')
    },
    updateCoupon() {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          const tempCurrentPage = this.pagination.current_page
          vm.getCoupons(tempCurrentPage)
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        }
      })
    },
    removeModal(item) {
      this.tempCoupon = item
      $('#removeCouponModal').modal('show')
      $('body').removeAttr('style class')
    },
    removeCoupon() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Coupon removed',
            type: 'success'
          })
          $('#removeCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          this.$message({
            showClose: true,
            message: 'Coupon removal failed',
            type: 'error'
          })
          $('#removeCouponModal').modal('hide')
          vm.getCoupons()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminCoupons.scss';
@import '@/assets/scss/components/_adminTable.scss';
@import '@/assets/scss/components/_adminModal.scss';
</style>
