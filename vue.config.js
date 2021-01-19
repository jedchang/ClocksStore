module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ClocksStore/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].description =
        'CLOCKS Store is a Modern Fully Responsive Retina Ready CLOCKS Store theme. Start your Store right away with CLOCKS Store.'
      return args
    })
  },
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
