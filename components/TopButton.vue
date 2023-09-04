<template>
  <button class="btn btn-secondary topBtn visible" id="top-btn" @click="top">
    <i class="bi bi-caret-up"></i>
  </button>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      isUserScrolling: false,
      handleDebouncedScroll: '',
    }
  },
  methods: {
    // this.handleDebouncedScroll = debounce(this.handleScroll, 0)
    // document
    //   .querySelector('.content-body')
    //     .addEventListener('scroll', () => {
    //     console.log(window.scrollY);
    //   })
    top() {
      document.querySelector('body').scrollIntoView()
    },
  },
  //   destroyed() {
  //     document
  //       .querySelector('.content-body')
  //       .removeEventListener('scroll')
  //   },
}
</script>

<style scoped>
.topBtn {
  position: fixed;
  right: 12px;
  bottom: 10px;
  z-index: -10;
  opacity: 0;
  transition: 300ms;
  visibility: collapse;
}
.visible {
  z-index: 10;
  opacity: 1;
  visibility: visible;
}
</style>