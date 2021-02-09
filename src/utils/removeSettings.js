import $ from 'jquery'

export default function removeSettings() {
  $(document.body).removeAttr('class')
  $('.hamburger').removeClass('active')
  $('.main-panel').removeClass('open')
  $('.navbar-brand').removeClass('hidden')
  $('.navbar-store').removeClass('hidden')
  $('.navbar-cart').removeClass('hidden')
  $('.navbar-wishLists').removeClass('hidden')
  $('.login-panel').removeClass('open')
  $('.navbar-toggle').removeClass('fixed')
  this.$store.commit('cartModules/OPEN_CART', false)
}
