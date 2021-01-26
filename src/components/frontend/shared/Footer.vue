<template>
  <footer class="footer">
    <div class="container">
      <div class="desktop-footer">
        <div class="service-wrapper">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="service-content">
                <div class="service-feature feature1">
                  <h4>Free Shipping</h4>
                  <p>Shipping for orders over $99</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="service-content">
                <div class="service-feature feature2">
                  <h4>Money Return</h4>
                  <p>30 days for free return</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="service-content">
                <div class="service-feature feature3">
                  <h4>Online Support</h4>
                  <p>Support 24 hours a day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="about-area">
                <h3 class="title">About CLOCKS</h3>
                <p>
                  CLOCKS Store is a Modern Fully Responsive Retina Ready CLOCKS
                  Store theme. Start your Store right away with CLOCKS Store.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="contact-area">
                <h3 class="title">Contact Us</h3>
                <ul class="info">
                  <li>
                    <font-awesome-icon :icon="['fas', 'store']" />
                    No: 58 A, East Madison Street, Baltimore
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'phone-alt']" />
                    <a href="tel:0800123456">0800-123-456</a>
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                    <a href="mailto://march.24@gmail.com">march.24@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-4">
              <div class="share-area">
                <h3 class="title">Share with Us</h3>
                <p class="">Special offers on social networks</p>
                <ul class="info">
                  <li class="github">
                    <a href="https://github.com/jedchang" target="_blank">
                      <font-awesome-icon :icon="['fab', 'github']" />
                    </a>
                  </li>
                  <li class="codepen">
                    <a href="https://codepen.io/jedchang" target="_blank">
                      <font-awesome-icon :icon="['fab', 'codepen']" />
                    </a>
                  </li>
                  <li class="facebook">
                    <a href="https://www.facebook.com/" target="_blank">
                      <font-awesome-icon :icon="['fab', 'facebook-f']" />
                    </a>
                  </li>
                  <li class="youtube">
                    <a href="https://www.youtube.com/" target="_blank">
                      <font-awesome-icon :icon="['fab', 'youtube']" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-footer">
        <div class="service-wrapper">
          <div class="row">
            <div class="col-md-12 col-12">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">Extra</template>
                  <div class="service-area">
                    <div class="service-feature feature1">
                      <h4>Free Shipping</h4>
                      <p>Shipping for orders over $99</p>
                    </div>
                    <div class="service-feature feature2">
                      <h4>Money Return</h4>
                      <p>30 days for free return</p>
                    </div>
                    <div class="service-feature feature3">
                      <h4>Online Support</h4>
                      <p>Support 24 hours a day</p>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">About CLOCKS</template>
                  <div class="info-area">
                    <p>
                      CLOCKS Store is a Modern Fully Responsive Retina Ready
                      CLOCKS Store theme. Start your Store right away with
                      CLOCKS Store.
                    </p>
                  </div>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">Contact Us</template>
                  <div class="contact-area">
                    <ul class="info">
                      <li>
                        <font-awesome-icon :icon="['fas', 'store']" />
                        No: 58 A, East Madison Street, Baltimore
                      </li>
                      <li>
                        <font-awesome-icon :icon="['fas', 'phone-alt']" />
                        <a href="tel:0800123456">0800-123-456</a>
                      </li>
                      <li>
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                        <a href="mailto://march.24@gmail.com"
                          >march.24@gmail.com</a
                        >
                      </li>
                    </ul>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <div class="share-area">
                <ul class="info">
                  <li class="github">
                    <a href="https://github.com/jedchang" target="_blank">
                      <font-awesome-icon :icon="['fab', 'github']" />
                    </a>
                  </li>
                  <li class="codepen">
                    <a href="https://codepen.io/jedchang" target="_blank">
                      <font-awesome-icon :icon="['fab', 'codepen']" />
                    </a>
                  </li>
                  <li class="facebook">
                    <a href="https://www.facebook.com/" target="_blank">
                      <font-awesome-icon :icon="['fab', 'facebook-f']" />
                    </a>
                  </li>
                  <li class="youtube">
                    <a href="https://www.youtube.com/" target="_blank">
                      <font-awesome-icon :icon="['fab', 'youtube']" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <div class="footer-inner">
            <p class="text copyright">
              © CLOCKS Store. All Rights Reserved.
            </p>
            <p class="text author">
              Develop by
              <a href="https://www.jedchang.tw" target="_blank">Jed Chang</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_footer.scss';
</style>
