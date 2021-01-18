import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import ProductsDetails from '@/components/products/ProductsDetails.vue'
import Faq from '../views/Faq.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Wishlist from '../views/Wishlist.vue'
import Order from '../views/Order.vue'
import Checkout from '../views/Checkout.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminProducts from '@/components/admin/AdminProducts.vue'
import AdminOrders from '@/components/admin/AdminOrders.vue'
import AdminCoupons from '@/components/admin/AdminCoupons.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/watches',
    name: 'Products',
    component: Products
  },
  {
    path: '/watches/:id?',
    name: 'ProductsDetails',
    component: ProductsDetails
  },
  {
    path: '/FAQ',
    name: 'Faq',
    component: Faq
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/checkout/:orderId',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: AdminCoupons,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
