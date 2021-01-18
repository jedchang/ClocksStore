module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ClicksStore/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "./node_modules/bootstrap/scss/functions.scss";
        @import "~@/assets/scss/utils/_variables.scss";
        @import "./node_modules/bootstrap/scss/bootstrap.scss";
        @import "~@/assets/scss/utils/_mixin.scss";
        @import "~@/assets/scss/utils/_transition.scss";
        `
      }
    }
  }
}
