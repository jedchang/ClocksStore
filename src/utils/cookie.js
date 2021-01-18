function setCookie(c_name, c_pwd, c_login, exdays) {
  let exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
  window.document.cookie = `userName=${c_name};path=/;expires=${exdate.toGMTString()}`
  window.document.cookie = `userPwd=${c_pwd};path=/;expires=${exdate.toGMTString()}`
  window.document.cookie = `isLogin=${c_login};path=/;expires=${exdate.toGMTString()}`
}

function getCookie() {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ')
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === 'userName') {
        this.user.username = arr2[1]
        this.checked = true
      } else if (arr2[0] === 'userPwd') {
        this.user.password = arr2[1]
      } else if (arr2[0] === 'isLogin') {
        this.isLogin = arr2[1]
      }
    }
  }
}

function clearCookie() {
  this.setCookie('', '', '', -1)
}

export { setCookie, getCookie, clearCookie }
