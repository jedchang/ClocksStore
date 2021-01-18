import $ from 'jquery'

export default function openModal() {
  $('#loginModal').modal('show')
  $('body').removeAttr('style class')
}
