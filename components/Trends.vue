<template>
  <CardContainer title="Trending" link="/trends">
  
    <div
      class="mt-3 slider gap-3"
      v-if="trending && Object.keys(trending).length > 0"
    >
      <div class="card" v-for="trend in trending.coins" :key="trend.item.id">
        <div class="img-thumb d-flex justify-content-center">
          <img :src="trend.item.large" :alt="trend.item.id" loading="lazy" />
        </div>
        <div class="text-section">
          <h5 class="mb-0">{{ trend.item.name }}</h5>
          <p class="text-muted text-small text-uppercase mb-0">
            {{ trend.item.symbol }}
          </p>
          <p class="text-small m-0">
            <span>
              <span>MKT Rank: </span>
              <span class="fw-bold">{{ trend.item.market_cap_rank }}</span>
            </span>
            <span class="ms-2">
              <span>Score: </span>
              <span class="fw-bold">{{ trend.item.score }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="px-3 d-flex gap-1 align-items-center" v-else>
      <p class="text-muted">No coin found</p>
      <Spin/>
    </div>
  </CardContainer>
</template>

<script>
export default {
  computed: {
    trending() {
      return this.$store.state.trending
    },
  },
}
</script>

<style scoped>
.img-thumb {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  background: var(--bs-gray-800);
}
.img-thumb img {
  width: 65px;
  height: 65px;
  margin: auto;
  border-radius: 50%;
}
</style>