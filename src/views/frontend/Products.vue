<template>
  <div class="wrapper watches-wrapper">
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
    <MobileSideMenu></MobileSideMenu>
    <div class="content-wrapper">
      <CartSideBar :filter-added="filterAddedCart"></CartSideBar>
      <Navbar @open-modal="openModal"></Navbar>
      <Breadcrumb></Breadcrumb>
      <div class="container page-container">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-12">
            <div class="shop-sidebar">
              <div class="filter-wrap">
                <div class="filter-item filter-category">
                  <h3 class="filter-heading">Category</h3>
                  <ul class="filter-list">
                    <li>
                      <a
                        href="#"
                        class="btn-category"
                        :class="{ current: filterText === 'All' }"
                        @click.prevent="changeCategory('All')"
                        >All Watches<span>({{ newProducts.length }})</span></a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="btn-category"
                        :class="{ current: filterText === 'Casual' }"
                        @click.prevent="changeCategory('Casual')"
                        >Casual series<span
                          >({{ getCasualNum.length }})</span
                        ></a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="btn-category"
                        :class="{ current: filterText === 'Stylish' }"
                        @click.prevent="changeCategory('Stylish')"
                        >Stylish series<span
                          >({{ getStylishNum.length }})</span
                        ></a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="btn-category"
                        :class="{ current: filterText === 'Classic' }"
                        @click.prevent="changeCategory('Classic')"
                        >Classic series<span
                          >({{ getClassicNum.length }})</span
                        ></a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="btn-category"
                        :class="{ current: filterText === 'Luxury' }"
                        @click.prevent="changeCategory('Luxury')"
                        >Luxury series<span
                          >({{ getLuxuryNum.length }})</span
                        ></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="banner-static">
                <router-link
                  to="/watches/-MJ_BM_GuINxCtixmOeZ"
                  class="banner-pic"
                >
                  <img
                    src="~@/assets/images/watches_sidebar_ad.jpg"
                    alt="Advertising img"
                  />
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-8 col-12">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-12">
                <div class="shop-toolbar">
                  <div class="product-result-count">
                    Showing all
                    <span> {{ filterProducts.length }} </span> results
                  </div>
                  <div class="product-view-mode">
                    <a
                      href="#"
                      class="btn-view grid"
                      :class="{ active: currentMode === 'grid' }"
                      @click.prevent="toggleViewMode('grid')"
                    >
                      <font-awesome-icon :icon="['fas', 'th-large']" />
                    </a>
                    <a
                      href="#"
                      class="btn-view list"
                      :class="{ active: currentMode === 'list' }"
                      @click.prevent="toggleViewMode('list')"
                    >
                      <font-awesome-icon :icon="['fas', 'th-list']" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="products-lists-wrap row no-gutters">
              <div
                v-for="product in filterProducts"
                :key="product.id"
                class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
              >
                <ProductsGridMode
                  v-if="currentMode === 'grid'"
                  :product-data="product"
                ></ProductsGridMode>
                <ProductsListMode
                  v-if="currentMode === 'list'"
                  :product-data="product"
                ></ProductsListMode>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileScrollTop></MobileScrollTop>
      <Footer></Footer>
      <ScrollTop></ScrollTop>
      <LoginModal></LoginModal>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import CartSideBar from '@/components/frontend/cart/CartSideBar'
import Navbar from '@/components/frontend/shared/Navbar'
import MobileSideMenu from '@/components/frontend/shared/MobileSideMenu'
import Breadcrumb from '@/components/frontend/shared/Breadcrumb'
import ProductsGridMode from '@/components/frontend/products/ProductsGridMode'
import ProductsListMode from '@/components/frontend/products/ProductsListMode'
import LoginModal from '@/components/frontend/shared/LoginModal'
import MobileScrollTop from '@/components/frontend/shared/MobileScrollTop'
import Footer from '@/components/frontend/shared/Footer'
import ScrollTop from '@/components/frontend/shared/ScrollTop'
import openModal from '@/utils/openModal.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Products',
  components: {
    CartSideBar,
    Navbar,
    MobileSideMenu,
    Breadcrumb,
    ProductsGridMode,
    ProductsListMode,
    LoginModal,
    MobileScrollTop,
    Footer,
    ScrollTop
  },
  data() {
    return {
      currentMode: 'grid'
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      setOpacity: state => state.setOpacity
    }),
    ...mapState('productsModules', {
      filterText: state => state.filterText
    }),
    ...mapGetters('productsModules', [
      'newProducts',
      'filterProducts',
      'getCasualNum',
      'getStylishNum',
      'getClassicNum',
      'getLuxuryNum'
    ]),
    ...mapGetters('cartModules', ['filterAddedCart'])
  },
  created() {
    this.$store.dispatch('updateLoading', true)
    this.$store.dispatch('productsModules/getProducts')
    this.$store.dispatch('cartModules/getCart')
    this.$store.commit('productsModules/TITLE_NAME', 'Watches')
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 800)
  },
  methods: {
    openModal,
    changeCategory(category) {
      const { top } = $('.page-container').offset()
      if ($(window).scrollTop() > 434) {
        $('html,body').animate({ scrollTop: top - 47.5 }, 600)
        setTimeout(() => {
          this.$store.commit('productsModules/FILTER_TEXT', category)
        }, 650)
      } else {
        this.$store.commit('productsModules/FILTER_TEXT', category)
      }
    },
    toggleViewMode(view) {
      this.currentMode = view
      if (this.currentMode === 'grid') {
        $('.products-lists-wrap')
          .removeClass('list-view')
          .addClass('grid-view')
      } else if (this.currentMode === 'list') {
        $('.products-lists-wrap')
          .removeClass('grid-view')
          .addClass('list-view')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/page/_products.scss';
</style>
