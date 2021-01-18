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
    component: Index,
    meta: { title: 'Clocks' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'Clocks | About' }
  },
  {
    path: '/watches',
    name: 'Products',
    component: Products,
    meta: { title: 'Clocks | Products' }
  },
  {
    path: '/watches/:id?',
    name: 'ProductsDetails',
    component: ProductsDetails,
    meta: { title: 'Clocks | Products Details' }
  },
  {
    path: '/FAQ',
    name: 'Faq',
    component: Faq,
    meta: { title: 'Clocks | FAQ' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Clocks | Contact' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Clocks | Cart' }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { title: 'Clocks | Wishlist' }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: { title: 'Clocks | Order' }
  },
  {
    path: '/checkout/:orderId',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Clocks | Checkout' }
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Admin' },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { requiresAuth: true, title: 'Admin | Products' }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
        meta: { requiresAuth: true, title: 'Admin | Orders' }
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: AdminCoupons,
        meta: { requiresAuth: true, title: 'Admin | Coupons' }
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
