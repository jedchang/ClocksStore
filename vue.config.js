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
        @import "./node_modules/bootstrap/scss/_functions.scss";
        @import "~@/assets/scss/helpers/_variables.scss";
        @import "./node_modules/bootstrap/scss/_mixins.scss";
        @import "~@/assets/scss/helpers/_mixin.scss";
        @import './node_modules/bootstrap/scss/_root';
        @import "./node_modules/bootstrap/scss/_reboot.scss";

        @import "./node_modules/bootstrap/scss/_grid.scss";
        @import "./node_modules/bootstrap/scss/_utilities.scss";
   
        @import "./node_modules/bootstrap/scss/_navbar.scss";
        @import "./node_modules/bootstrap/scss/_type.scss";
        @import "./node_modules/bootstrap/scss/_buttons.scss";
        @import "./node_modules/bootstrap/scss/_tables.scss";
        @import "./node_modules/bootstrap/scss/_modal.scss";
        @import "./node_modules/bootstrap/scss/_dropdown.scss";
        @import "./node_modules/bootstrap/scss/_badge.scss";
        @import "./node_modules/bootstrap/scss/_pagination.scss";
        @import "./node_modules/bootstrap/scss/_close.scss";
        @import "./node_modules/bootstrap/scss/_forms.scss";
        @import "~@/assets/scss/helpers/_transition.scss";
        `
      }
    }
  }
}
