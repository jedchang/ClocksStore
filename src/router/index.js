import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/frontend/Index.vue'
import About from '../views/frontend/About.vue'
import Products from '../views/frontend/Products.vue'
import ProductsDetails from '../views/frontend/ProductsDetails.vue'
import Faq from '../views/frontend/Faq.vue'
import Contact from '../views/frontend/Contact.vue'
import Cart from '../views/frontend/Cart.vue'
import Wishlist from '../views/frontend/Wishlist.vue'
import Order from '../views/frontend/Order.vue'
import Checkout from '../views/frontend/Checkout.vue'
import Dashboard from '../views/backend/Dashboard.vue'
import AdminProducts from '@/components/backend/AdminProducts.vue'
import AdminOrders from '@/components/backend/AdminOrders.vue'
import AdminCoupons from '@/components/backend/AdminCoupons.vue'

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
    meta: { title: 'CLOCKS Store' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About | CLOCKS Store' }
  },
  {
    path: '/watches',
    name: 'Products',
    component: Products,
    meta: { title: 'Watches | CLOCKS Store' }
  },
  {
    path: '/watches/:id?',
    name: 'ProductsDetails',
    component: ProductsDetails,
    meta: { title: 'Watches Details | CLOCKS Store' }
  },
  {
    path: '/FAQ',
    name: 'Faq',
    component: Faq,
    meta: { title: 'FAQ | CLOCKS Store' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact | CLOCKS Store' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Cart | CLOCKS Store' }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { title: 'Wishlist | CLOCKS Store' }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: { title: 'Order | CLOCKS Store' }
  },
  {
    path: '/checkout/:orderId',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Checkout | CLOCKS Store' }
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
        meta: { requiresAuth: true, title: 'Products | Admin' }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
        meta: { requiresAuth: true, title: 'Orders | Admin' }
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: AdminCoupons,
        meta: { requiresAuth: true, title: 'Coupons | Admin' }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
