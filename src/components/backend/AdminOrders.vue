<template>
  <div class="orders-content">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :opacity="setOpacity"
        :background-color="'#222736'"
      >
        <template slot="default">
          <div class="inner">
            <div class="clock">
              <div class="minutes"></div>
              <div class="hours"></div>
            </div>
            <span>LOADING</span>
          </div>
        </template>
      </loading>
    </div>
    <AdminBreadcrumb :title-name="titleName"></AdminBreadcrumb>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="card">
            <div class="card-body">
              <simplebar class="simplebar">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th class="order-number-thead">Order number</th>
                      <th class="purchase-time-thead">Purchase time</th>
                      <th class="email-thead">Email</th>
                      <th class="purchase-item-thead">Purchase item</th>
                      <th class="total-price-thead">Total price</th>
                      <th class="payment-thead">Payment</th>
                      <th class="options-order-thead">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in orders" :key="item.id">
                      <td class="order-number">
                        {{ item.id }}
                      </td>
                      <td class="purchase-time">
                        {{ item.create_at | date }}
                      </td>
                      <td class="email">
                        <span> {{ item.user.email }}</span>
                      </td>
                      <td class="purchase-item">
                        <ul class="list-unstyled">
                          <li
                            v-for="(product, index) in item.products"
                            :key="index"
                          >
                            <span class="title">{{
                              product.product.title
                            }}</span>
                            :
                            <span class="qty">
                              {{ product.qty }}
                            </span>
                            <span class="unit">
                              {{ product.product.unit }}
                            </span>
                          </li>
                        </ul>
                      </td>
                      <td class="total-price">
                        {{ item.total | currency }}
                      </td>
                      <td class="payment">
                        <span
                          v-if="item.is_paid"
                          class="badge badge-pill badge-success"
                          >Payment completed</span
                        >
                        <span v-else class="badge badge-pill badge-danger"
                          >Not yet paid</span
                        >
                      </td>
                      <td class="options-order">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Edit"
                          placement="top"
                          :visible-arrow="visibleArrow"
                        >
                          <a
                            href="#"
                            class="btn-edit mr-2"
                            @click.prevent="openModal(false, item)"
                          >
                            <font-awesome-icon :icon="['fas', 'pen']" />
                          </a>
                        </el-tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </simplebar>
              <Pagination
                :paging-content="pagination"
                @changePaging="getOrders"
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
      <div id="orderModal" class="modal fade" tabindex="-1" role="dialog">
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
          role="document"
        >
          <ValidationObserver
            ref="observer"
            v-slot="{ invalid, handleSubmit }"
            class="validation-wrapper"
          >
            <form
              class="modal-content"
              @submit.prevent="handleSubmit(updateOrder)"
            >
              <div class="modal-header">
                <h5 id="orderModalLabel" class="modal-title">
                  Change Order
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
                  <div class="form-group col-lg-4 col-md-12 col-12">
                    <label for="date">Purchase time</label>
                    <input
                      id="date"
                      v-model="tempOrder.create_at"
                      type="text"
                      class="form-control"
                      placeholder="Please enter purchase time"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-lg-4 col-md-12 col-12">
                    <div class="form-group">
                      <label for="username">Name</label>
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        rules="name-required"
                      >
                        <input
                          id="username"
                          v-model="tempOrder.user.name"
                          type="text"
                          class="form-control"
                          name="Name"
                          placeholder="Please enter name"
                          required
                          :class="classes"
                        />
                        <span class="text-danger"> {{ errors[0] }} </span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <label for="usertel">Tel</label>
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        rules="numeric"
                      >
                        <input
                          id="usertel"
                          v-model="tempOrder.user.tel"
                          type="tel"
                          class="form-control"
                          name="Tel"
                          placeholder="Please enter tel"
                          required
                          :class="classes"
                        />
                        <span class="text-danger"> {{ errors[0] }} </span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-12 col-12">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        rules="email-required"
                      >
                        <input
                          id="useremail"
                          v-model="tempOrder.user.email"
                          type="email"
                          class="form-control"
                          name="Email"
                          placeholder="Please enter email"
                          required
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }} </span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <label for="useraddress">Address</label>
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        rules="addr-required"
                      >
                        <input
                          id="useraddress"
                          v-model="tempOrder.user.address"
                          type="text"
                          class="form-control"
                          name="Address"
                          placeholder="Please enter address"
                          required
                          :class="classes"
                        />
                        <span class="text-danger"> {{ errors[0] }} </span>
                      </ValidationProvider>
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
                  type="submit"
                  class="btn btn-primary btn-confirm"
                  :disabled="invalid"
                >
                  <font-awesome-icon :icon="['fas', 'check']" />
                  Confirm
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AdminBreadcrumb from '@/components/backend/shared/AdminBreadcrumb'
import Pagination from '@/components/backend/shared/Pagination'
import removeSettings from '@/utils/removeSettings.js'
import { mapState } from 'vuex'

export default {
  name: 'AdminOrders',
  components: {
    AdminBreadcrumb,
    Pagination
  },
  data() {
    return {
      titleName: 'Orders',
      orders: {},
      pagination: {},
      tempOrder: {
        create_at: '',
        id: '',
        is_paid: '',
        num: '',
        total: '',
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        }
      },
      isNew: false,
      visibleArrow: false
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity
    })
  },
  created() {
    this.getOrders()
  },
  mounted() {
    this.removeSettings()
  },
  methods: {
    removeSettings,
    getOrders(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      this.$store.commit('LOADING', true, { root: true })
      this.$http.get(api).then(response => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        this.$store.commit('LOADING', false, { root: true })
      })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempOrder = {}
        this.isNew = true
      } else {
        this.tempOrder = Object.assign({}, item)
        this.isNew = false
      }
      $('#orderModal').modal('show')
      $('body').removeAttr('style class')
    },
    updateOrder() {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Order information updated',
            type: 'success'
          })
          $('#orderModal').modal('hide')
          let tempCurrentPage = this.pagination.current_page
          vm.getOrders(tempCurrentPage)
        } else {
          this.$message({
            showClose: true,
            message: 'Update failed!',
            type: 'error'
          })
          $('#orderModal').modal('hide')
          vm.getOrders()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminOrders.scss';
@import '@/assets/scss/components/_adminTable.scss';
@import '@/assets/scss/components/_adminModal.scss';
</style>
