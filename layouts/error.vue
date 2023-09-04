<template>
  <section>
    <h1>Something went wrong</h1>
    <button @click="handleError" class="btn btn-dark">Return</button>
  </section>
</template>

<script setup>
const props = defineProps({
  error: Object,
})
z``
const handleError = () => clearError({ redirect: '/' })
</script>
