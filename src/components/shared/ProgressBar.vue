<template>
  <ul
    class="steps-wrapper"
    :class="{ 'step-2': progressStatus === 2, 'step-3': progressStatus === 3 }"
  >
    <li
      class="step step-1"
      :class="{
        current: progressStatus === 1,
        valid: validStatus === 1 || validStatus === 2
      }"
    >
      <div class="status">
        <span class="order">1</span>
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </div>
      <p class="text">
        Cart
      </p>
    </li>
    <li
      class="step step-2"
      :class="{ current: progressStatus === 2, valid: validStatus === 2 }"
    >
      <div class="status">
        <span class="order">2</span>
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </div>
      <p class="text">
        Order
      </p>
    </li>
    <li
      class="step step-3"
      :class="{ current: progressStatus === 3, valid: validStatus === 3 }"
    >
      <div class="status">
        <span class="order">3</span>
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'check']" />
        </span>
      </div>
      <p class="text">
        Checkout
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    currentProgress: {
      type: Number,
      required: true
    },
    currentValid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      progressStatus: this.currentProgress,
      validStatus: this.currentValid,
      messages: []
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_progressBar.scss';
</style>
