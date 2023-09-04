<template>
  <div class="container-fluid">
    <header class="trnd-jumb">
      <h2 class="title">Trending coins</h2>
    </header>
    <br />
    <br />
    <main class="py-5">
      <div class="search-area col-lg-5 col-sm-10 col-md-7">
        <label for="search" class="form-label">Search Trends</label>
        <input type="text" class="form-control dark" />
      </div>
      <br />
      <br />

      <article class="row gap-3">
        <div
          class="error"
          v-if="!trending || Object.keys(trending).length === 0"
        ></div>

        <div
          class="coin-layout dark col-sm-8 col-lg-3 rounded px-3 py-2"
          v-else
          v-for="item in trending.coins"
          :key="item.item.coin_id"
        >
          <div class="c-hd">
            <div class="thumb-img">
              <img
                :src="item.item.large"
                :alt="item.item.name"
                class="img-thumb"
              />
            </div>
            <div class="slogan text-small text-muted">
              {{ item.item.symbol }}
            </div>
          </div>
          <div class="c-bdy">
            <h5 class="name">{{ item.item.name }}</h5>
            <p class="price text-small">
              $
              <span class="text-danger" v-if="item.item.price_btc < 0"
                >{{ item.item.price_btc.toFixed(6) }}
              </span>
              <span style="color: var(--bs-teal)" v-else
                >{{ item.item.price_btc.toFixed(6) }}
              </span>
            </p>

            <p class="rank">
              Rank:
              <span class="fw-bold"> {{ item.item.market_cap_rank }}</span>
            </p>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  name: 'trends',
  head: {
    title: 'Trends',
    meta: [{
      hid: "description",
      name: "description",
      content: "You can find all the latest and updated trending coins here."
    }]
  },
  computed: {
    trending() {
      return this.$store.state.trending
    },
  },
}
</script>

<style scoped>
.trnd-jumb {
  box-sizing: border-box;
  border-radius: 6px;
  height: 250px;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  background-color: var(--dark-50);
  background-image: url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80');
  background-position: center;
}
.coin-layout {
  transition: transform 300ms ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
.coin-layout:hover {
  transform: translateY(-12px);
}
.coin-layout .c-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.coin-layout .c-hd .thumb-img,
.coin-layout .c-hd .thumb-img img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-gray-900);
}
</style>