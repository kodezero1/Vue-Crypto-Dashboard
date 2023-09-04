<template>
  <section class="card-container">
    <slot name="header">
      <header
        class="d-flex align-items-center justify-content-between px-3 pt-2"
      >
        <div class="h3 title" v-if="title">{{ title }}</div>
        <nuxt-link :to="link" v-if="link" class="text-link text-small btn text-white"
          >View all</nuxt-link>
      </header>
    </slot>

    <article class="container-fluid"  :style="{ overflowX: responsive && 'auto' }">
      <slot />
    </article>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    link: String,
    responsive: Boolean,
  },
}
</script>

<style lang="scss" scoped></style>
