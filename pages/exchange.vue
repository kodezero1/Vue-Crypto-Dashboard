<template>
  <section>
    <CardContainer title="Top Exchange Coins" class="bg-transparent">
      <ul
        class="cards d-flex align-items-center flex-wrap gap-3 px-0 pt-3"
        v-if="top_exchanges() && Array.isArray(top_exchanges())"
      >
        <li
          class="d-flex col-sm-12 flex-wrap col-md-8 col-lg-5 align-items-center justify-content-between bg-dark px-3 rounded py-3"
          v-for="item in top_exchanges()"
          :key="item.id"
        >
          <a
            class="cap me-5 d-flex align-items-center flex-wrap gap-3 w-100 text-link"
            :href="item.url"
            target="_blank"
          >
            <div class="img">
              <img
                :src="item.image"
                :alt="item.id"
                class="img-thumbnail top_img"
              />
            </div>

            <div
              class="d-flex ms-3 sm-ms-0 gap-2 align-items-center justify-content-between flex-wrap"
            >
              <div class="details">
                <p class="mb-0">{{ item.name }}</p>
                <p class="mb-0 text-small text-muted">{{ item.id }}</p>
              </div>

              <div class="raio">
                <p class="mb-0 text-small" style="color: var(--bs-teal)">
                  {{ item.trust_score }}%
                </p>
                <p class="mb-0 text-small text-muted">
                  {{ item.trade_volume_24h_btc.toLocaleString() }}
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </CardContainer>

    <br />
    <CardContainer title="All Exchange Scores" class="bg-transparent">
      <Tableu :columns="tHead" :datas="scores">
        <template #td="{ data, i }">
          <td class="td ps-3">{{ i + 1 }}</td>
          <td class="td me-5">
            <a
              :href="data.url"
              target="_blank"
              class="d-flex nav-link align-items-start"
            >
              <img
                :src="data.image"
                :alt="data.name"
                class="img-thumbnail border-0 bg-transparent"
              />
              <h6 class="ms-2 me-4">
                {{ data.name }}
                <p class="text-small text-muted">{{ data.country }}</p>
              </h6>
            </a>
          </td>
          <td class="td ms-5 ps-4">
            <i class="bi bi-currency-bitcoin"></i>
            {{ data.trade_volume_24h_btc.toLocaleString() }}
          </td>
          <td class="td">
            <i class="bi bi-currency-bitcoin"></i>
            {{ data.trade_volume_24h_btc_normalized.toLocaleString() }}
          </td>

          <td class="td">
            <button class="btn">
              <span v-if="data.trust_score === 1">
                <i class="bi bi-star-fill text-warning"></i>
              </span>
              <span v-else-if="data.trust_score <= 5">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </span>
              <span v-else-if="data.trust_score > 9">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </span>
              <span v-else>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
              </span>
            </button>

            <span class="text-muted"> ({{ data.trust_score }})</span>
          </td>
          <td class="td"><a class="btn btn-gradient" :href="data.url" target="_blank"> Open </a></td>
        </template>
      </Tableu>
    </CardContainer>
    <br />

    <CardContainer title="Exchange Rates" class="bg-transparent" id="exchange_rates">
      <br />

      <div
        class="cards d-flex bg-dark px-3 mb-3 flex-wrap align-items-center justify-content-between"
        v-for="(item, index) in rates" :key="index"
      >
        <div class="d-flex gap-5 align-items-center flex-wrap">
          <div>
            <span class="text-muted text-small">Name</span>
            <p class="text-small">{{item.name}}</p>
          </div>
          <div>
            <span class="text-muted text-small">Unit</span>
            <p class="text-small">{{item.unit}}</p>
          </div>
          <div>
            <span class="text-muted text-small">Value</span>
            <p class="text-small">{{item.value.toFixed(3)}}</p>
          </div>
          <div>
            <span class="text-muted text-small">Type</span>
            <p class="text-small">{{item.type}}</p>
          </div>
        </div>
        
      </div>
    </CardContainer>
  </section>
</template>

<script>
import CardContainer from '../components/CardContainer.vue'
export default {
  name: 'Exchange',
  components: { CardContainer },
  data: () => ({
    rates: [],
    scores: '',
    tHead: [
      { title: '#' },
      { title: 'Exchange' },
      { title: '24H Vol' },
      { title: '24 Vol(Normailized)' },
      { title: 'Trust Score' },
    ],
  }),
  methods: {
    exchanges: async function () {
      let result = await fetch('https://api.coingecko.com/api/v3/exchanges')
      return await result.json()
    },

    exchange_rates: async function () {
      let req = await fetch(
        'https://api.coingecko.com/api/v3/exchange_rates'
      )
      let data = await req.json();
        let res = data.rates;
      let result = [];
      for (let index = 0; index < Object.keys(res).length; index++) {
        // Get the rate names from the object keys
        const rateNames = Object.keys(res)[index];
        // Get other properties from the rate object values
        const rateValues = Object.values(res)[index];
        // Merge the rate names with the rest of the properties to form a single object
        result.push({title: rateNames, ...rateValues});
      }
      return result;
    },

    top_exchanges: function () {
      // Check if the score rates data is available
      if (!Array.isArray(this.scores) && this.scores === '') return null

      //  Filter out the data that has the top 3 trust score (max =10)
      let result = this.scores.filter((item) => item.trust_score >= 10)

      return result.length < 3 ? result : result.splice(0, 3)
    },

  },
  async created() {
    this.scores = await this.exchanges()
    this.rates = await this.exchange_rates();
  },
}
</script>

<style scoped>
.text-link {
  text-decoration: none;
  color: var(--bs-white);
}
.btn-gradient {
  background: linear-gradient(327deg, #262c3b, #40474f);
  color: #fff;
  transition: 300ms linear;
}
.btn-gradient:hover {
  background: linear-gradient(360deg, #262c3b, #40474f) !important;
}
</style>
