<template>
  <div class="form-fields">
    <div class="form-inner">
      <h2 class="heading">Contact Information</h2>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid, handleSubmit }"
        class="validation-wrapper"
      >
        <form
          class="contact-form"
          @submit.prevent="handleSubmit(submitContact)"
          @reset.prevent="reset"
        >
          <div class="col-lg-6 col-md-6 col-12">
            <div class="form-group">
              <ValidationProvider
                v-slot="{ errors, classes }"
                rules="name-required"
              >
                <input
                  id="contactForName"
                  v-model="contactInfo.name"
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Please enter Name"
                  required
                  :class="classes"
                >
                <span class="text-danger"> {{ errors[0] }} </span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider
                v-slot="{ errors, classes }"
                rules="email-required"
              >
                <input
                  id="contactForEmail"
                  v-model="contactInfo.email"
                  type="email"
                  class="form-control"
                  name="Email"
                  placeholder="Please enter Email"
                  required
                  :class="classes"
                >
                <span class="text-danger">{{ errors[0] }} </span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider
                v-slot="{ errors, classes }"
                rules="tel-required"
              >
                <input
                  id="contactForPhone"
                  v-model="contactInfo.phone"
                  type="tel"
                  class="form-control"
                  name="Phone"
                  placeholder="Please enter Phone"
                  required
                  :class="classes"
                >
                <span class="text-danger"> {{ errors[0] }} </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <div class="form-group">
              <ValidationProvider
                v-slot="{ errors, classes }"
                rules="msg-required"
              >
                <textarea
                  id="contactForMessage"
                  v-model="contactInfo.message"
                  class="form-control form-message"
                  rows="8"
                  name="Message"
                  placeholder="Please enter Message"
                  required
                  :class="classes"
                />
                <span class="text-danger"> {{ errors[0] }} </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="col-lg-12 col-md-12 col-12 action-button">
            <button
              :class="{
                disabled:
                  contactInfo.name === '' ||
                  contactInfo.email === '' ||
                  contactInfo.phone === '' ||
                  contactInfo.message === ''
              }"
              type="submit"
              class="btn btn-primary btn-submit"
            >
              Send Your Message
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      contactInfo: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    submitContact() {
      this.$store.dispatch(
        'alertModules/pushMessages',
        this.$message({
          showClose: true,
          message: 'Form sent',
          type: 'success'
        })
      )
      this.contactInfo.name = this.contactInfo.email = this.contactInfo.phone = this.contactInfo.message =
        ''
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_contactForm.scss';
</style>
