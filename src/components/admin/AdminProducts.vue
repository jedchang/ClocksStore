<template>
  <div class="products-content">
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
              <div class="btn-wrap">
                <button
                  type="button"
                  class="btn btn-add-product rounded-pill"
                  @click="openProductModal(true)"
                >
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  Create a new product
                </button>
              </div>
              <simplebar class="simplebar">
                <table class="table">
                  <thead class="thead-light">
                    <tr>
                      <th class="product-category-thead">Category</th>
                      <th class="product-name-thead">Product Name</th>
                      <th class="product-original-price-thead">
                        Original Price
                      </th>
                      <th class="product-price-thead">Price</th>
                      <th class="product-state-thead">State</th>
                      <th class="product-options-thead">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in products" :key="item.id">
                      <td class="product-category">{{ item.category }}</td>
                      <td class="product-name">{{ item.title }}</td>
                      <td
                        v-if="item.origin_price"
                        class="product-original-price"
                      >
                        {{ item.origin_price | currency }}
                      </td>
                      <td v-else class="product-original-price empty">
                        N/A
                      </td>
                      <td v-if="item.price" class="product-price">
                        {{ item.price | currency }}
                      </td>
                      <td v-else class="product-price empty">
                        N/A
                      </td>
                      <td class="product-state">
                        <span
                          v-if="item.is_enabled"
                          class="badge badge-pill badge-success"
                          >Enable</span
                        >
                        <span v-else class="badge badge-pill badge-danger"
                          >Disable</span
                        >
                      </td>
                      <td class="product-options">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="Edit"
                          placement="top"
                        >
                          <a
                            href="javascript:;"
                            class="btn-edit"
                            @click="openProductModal(false, item)"
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
                            href="javascript:;"
                            class="btn-remove"
                            @click="removeModal(item)"
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
                @changePaging="getProducts"
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
      <div id="productModal" class="modal fade" tabindex="-1" role="dialog">
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="productModalLabel" class="modal-title">
                New Product
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
            <simplebar class="simplebar">
              <div class="modal-body">
                <div class="row">
                  <div class="col-lg-5 col-md-12 col-sm-5 col-12">
                    <div class="form-group">
                      <label for="image">Enter image URL</label>
                      <input
                        id="image"
                        v-model="tempProduct.imageUrl"
                        type="text"
                        class="form-control"
                        placeholder="Please enter the image link"
                      />
                    </div>
                    <div class="form-group">
                      <div class="line">or</div>
                      <label for="customFile" class="custom-file-upload">
                        Upload image
                        <font-awesome-icon
                          v-if="status.fileUploading"
                          icon="spinner"
                          spin
                        />
                      </label>
                      <input
                        id="customFile"
                        ref="files"
                        type="file"
                        class="form-control"
                        @change="uploadFile"
                      />
                    </div>
                    <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
                  </div>
                  <div class="col-lg-7 col-md-12 col-sm-7 col-12">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input
                        id="title"
                        v-model="tempProduct.title"
                        type="text"
                        class="form-control"
                        placeholder="Please enter title"
                      />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-lg-6 col-md-12 col-12">
                        <label for="category">Category</label>
                        <input
                          id="category"
                          v-model="tempProduct.category"
                          type="text"
                          class="form-control"
                          placeholder="Please enter category"
                        />
                      </div>
                      <div class="form-group col-lg-6 col-md-12 col-12">
                        <label for="price">Unit</label>
                        <input
                          id="unit"
                          v-model="tempProduct.unit"
                          type="unit"
                          class="form-control"
                          placeholder="Please enter unit"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-lg-6 col-md-12 col-12">
                        <label for="origin_price">Original price</label>
                        <input
                          id="origin_price"
                          v-model="tempProduct.origin_price"
                          type="number"
                          class="form-control"
                          placeholder="Please enter original price"
                        />
                      </div>
                      <div class="form-group col-lg-6 col-md-12 col-12">
                        <label for="price">Price</label>
                        <input
                          id="price"
                          v-model="tempProduct.price"
                          type="number"
                          class="form-control"
                          placeholder="Please enter price"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        id="description"
                        v-model="tempProduct.description"
                        type="text"
                        class="form-control"
                        placeholder="Please enter description"
                      />
                    </div>
                    <div class="form-group">
                      <label for="content">Content</label>
                      <textarea
                        id="content"
                        v-model="tempProduct.content"
                        type="text"
                        class="form-control"
                        placeholder="Please enter content"
                      />
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <el-checkbox
                          id="is_enabled"
                          v-model="tempProduct.is_enabled"
                          :true-label="1"
                          :false-label="0"
                          >Enable</el-checkbox
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </simplebar>
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
                @click="updateProduct"
              >
                <font-awesome-icon :icon="['fas', 'check']" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="removeProductModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="removeProductLabel" class="modal-title">
                Remove Product
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
              <strong class="text-danger">{{ tempProduct.title }}</strong>
              Product (cannot be restored after removal)。
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
                @click="removeProduct"
              >
                <font-awesome-icon :icon="['fas', 'check']" />
                Confirm removal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb'
import Pagination from '@/components/admin/Pagination'
import removeSettings from '@/utils/removeSettings.js'
import { mapState } from 'vuex'

export default {
  name: 'AdminProducts',
  components: {
    AdminBreadcrumb,
    Pagination
  },
  data() {
    return {
      titleName: 'Products',
      products: [],
      pagination: {},
      tempProduct: {
        is_enabled: false
      },
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity
    })
  },
  created() {
    this.getProducts()
  },
  mounted() {
    this.removeSettings()
  },
  methods: {
    removeSettings,
    getProducts(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      this.$store.commit('LOADING', true, { root: true })
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        this.$store.commit('LOADING', false, { root: true })
      })
    },
    openProductModal(isNew, item) {
      if (isNew) {
        $('#customFile').val('')
        ;(this.tempProduct = {
          is_enabled: false
        }),
          (this.isNew = true)
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
      $('body').removeAttr('style class')
    },
    updateProduct() {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Product updated',
            type: 'success'
          })
          $('#productModal').modal('hide')
          let tempCurrentPage = this.pagination.current_page
          vm.getProducts(tempCurrentPage)
        } else {
          this.$message({
            showClose: true,
            message: 'Update failed!',
            type: 'error'
          })
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('新增失敗')
        }
      })
    },
    removeModal(item) {
      this.tempProduct = item
      $('#removeProductModal').modal('show')
      $('body').removeAttr('style class')
    },
    removeProduct() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          this.$message({
            showClose: true,
            message: 'Product removed',
            type: 'success'
          })
          $('#removeProductModal').modal('hide')
          vm.getProducts()
        } else {
          this.$message({
            showClose: true,
            message: 'Product removal failed',
            type: 'error'
          })
          $('#removeProductModal').modal('hide')
          vm.getProducts()
          console.log('產品刪除失敗')
        }
      })
    },
    uploadFile() {
      const vm = this
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          vm.status.fileUploading = false
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_adminProducts.scss';
@import '@/assets/scss/components/_adminTable.scss';
@import '@/assets/scss/components/_adminModal.scss';
</style>
