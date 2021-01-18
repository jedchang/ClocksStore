<template>
  <nav class="pagination-wrap">
    <ul class="pagination">
      <li
        v-for="page in pagingContent.total_pages"
        :key="page"
        class="page-item"
        :class="{ active: pagingContent.current_page === page }"
      >
        <a
          v-if="pagingContent.total_pages !== 1"
          class="page-link"
          href="#"
          @click.prevent="getPaging(page)"
        >
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagingContent: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPaging(page) {
      this.$emit('changePaging', page)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_pagination.scss';
</style>
