<template>
  <div class="product-rating">
    <span v-if="productStars === 2">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
    </span>
    <span v-if="productStars === 3">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
    </span>
    <span v-if="productStars === 3.5">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star half" :icon="['fas', 'star-half-alt']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
    </span>
    <span v-if="productStars === 4">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star empty" :icon="['far', 'star']" />
    </span>
    <span v-if="productStars === 4.5">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star half" :icon="['fas', 'star-half-alt']" />
    </span>
    <span v-if="productStars === 5">
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
      <font-awesome-icon class="star fill" :icon="['fas', 'star']" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProductRating',
  props: {
    productStars: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_productRating.scss';
</style>
