<template>
  <section v-if="result && Object.keys(result).length > 0">
    <article class="px-2 row justify-content-between">
      <div class="left col-sm-10 col-md-7 col-lg-7">
        <div class="name d-flex align-items-center">
          <div class="img-thumbs me-2">
            <img :src="result.image.large" alt="" class="img-thumb icon" />
          </div>
          <div class="d-flex">
            <h4>{{ result.name }}</h4>
            <sup class="text-small text-uppercase text-muted"
              >({{ result.symbol }})</sup
            >
          </div>
        </div>
        <br />
        <div class="d-flex align-items-center gap-2">
          <h2 class="point">
            <span
              v-for="(cap, index) in Object.keys(
                result.market_data.current_price
              )"
              :key="cap"
            >
              <span v-if="cap === currentCurrency">
                <span v-if="cap === 'usd'"
                  >$
                  {{
                    Object.values(result.market_data.current_price)[
                      index
                    ].toLocaleString()
                  }}</span
                >
                <span v-else-if="currentCurrency === 'eth'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 0 0 4.064 1.41l1.7 1.133A4.5 4.5 0 0 1 8.028 13H7v-2h1.027a4.5 4.5 0 0 1 7.788-2.543L14.114 9.59A2.5 2.5 0 0 0 10.05 11z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                </span>

                <span v-else-if="currentCurrency === 'btc'">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 1 0 0-1h-4zm0-3v1h4a.5.5 0 1 0 0-1h-4z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                </span>

                <span v-else>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                  <span class="text-small text-muted">
                    {{ currentCurrency }}
                  </span>
                </span>
              </span>
            </span>
          </h2>
          <sup
            class="bg-danger badge text-small"
            v-if="result.market_data.market_cap_change_percentage_24h < 0"
            >{{
              result.market_data.market_cap_change_percentage_24h.toFixed(1)
            }}%</sup
          >
          <sup class="bg-success badge text-small" v-else
            >{{
              result.market_data.market_cap_change_percentage_24h.toFixed(1)
            }}%</sup
          >
        </div>
        <p>
          <span class="text-muted">last updated: </span>
          <span class="fw-bold">{{ result.last_updated }}</span>
        </p>
        <div class="details py-4">
          <div class="border-bottom border-dark">
            <p>
              <span class="me-3 text-muted">24 Hours Rate:</span>
              <span
                v-if="result.market_data.price_change_percentage_24h >= 0"
                style="color: var(--bs-teal)"
              >
                {{ result.market_data.price_change_percentage_24h.toFixed(2) }}%
              </span>
              <span v-else class="text-danger">
                {{ result.market_data.price_change_percentage_24h.toFixed(2) }}%
              </span>
            </p>
          </div>

          <p class="border-bottom border-dark">
            <span class="me-3">
              <span class="text-muted me-3">Market Cap:</span>
              <span
                v-for="(cap, index) in Object.keys(
                  result.market_data.market_cap
                )"
                :key="cap"
              >
                <span v-if="cap === currentCurrency">
                  <span v-if="cap === 'usd'"
                    >$
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}</span
                  >
                  <span v-else-if="currentCurrency === 'eth'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 0 0 4.064 1.41l1.7 1.133A4.5 4.5 0 0 1 8.028 13H7v-2h1.027a4.5 4.5 0 0 1 7.788-2.543L14.114 9.59A2.5 2.5 0 0 0 10.05 11z"
                        fill="rgba(255,255,255,1)"
                      />
                    </svg>
                  </span>

                  <span v-else-if="currentCurrency === 'btc'">
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 1 0 0-1h-4zm0-3v1h4a.5.5 0 1 0 0-1h-4z"
                        fill="rgba(255,255,255,1)"
                      />
                    </svg>
                  </span>
                  <span v-else>
                    {{ currentCurrency }}
                    {{
                      Object.values(result.market_data.market_cap)[
                        index
                      ].toLocaleString()
                    }}
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p class="border-bottom border-dark">
            <span class="">
              <span class="me-3 text-muted">Fully Dilluted Valuation:</span>
              <span
                v-for="(cap, index) in Object.keys(
                  result.market_data.fully_diluted_valuation
                )"
                :key="cap"
              >
                <span v-if="cap === currentCurrency">
                  <span v-if="cap === 'usd'"
                    >$
                    <span
                      v-if="Object.values(result.market_data.market_cap)[index]"
                    >
                      {{
                        Object.values(
                          result.market_data.fully_diluted_valuation
                        )[index].toLocaleString()
                      }}
                    </span>
                  </span>
                  <span v-else-if="currentCurrency === 'eth'">
                    <span
                      v-if="Object.values(result.market_data.market_cap)[index]"
                    >
                      {{
                        Object.values(result.market_data.market_cap)[
                          index
                        ].toLocaleString()
                      }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 0 0 4.064 1.41l1.7 1.133A4.5 4.5 0 0 1 8.028 13H7v-2h1.027a4.5 4.5 0 0 1 7.788-2.543L14.114 9.59A2.5 2.5 0 0 0 10.05 11z"
                        fill="rgba(255,255,255,1)"
                      />
                    </svg>
                  </span>

                  <span v-else-if="currentCurrency === 'btc'">
                    <span
                      v-if="Object.values(result.market_data.market_cap)[index]"
                    >
                      {{
                        Object.values(result.market_data.market_cap)[
                          index
                        ].toLocaleString()
                      }}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4H8V8h3V6h2v2h1a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4h-1v2h-2v-2zm-1-3v1h4a.5.5 0 1 0 0-1h-4zm0-3v1h4a.5.5 0 1 0 0-1h-4z"
                        fill="rgba(255,255,255,1)"
                      />
                    </svg>
                  </span>

                  <span v-else>
                    <span
                      v-if="Object.values(result.market_data.market_cap)[index]"
                    >
                      {{
                        Object.values(result.market_data.market_cap)[
                          index
                        ].toLocaleString()
                      }}
                      {{ currentCurrency }}
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p class="border-bottom border-dark">
            <span class="text-muted">Circulating Supply: </span>
            <span
              class="fw-bold"
              v-if="result.market_data.circulating_supply"
              >{{
                result.market_data.circulating_supply.toLocaleString()
              }}</span
            >
          </p>
          <p class="border-bottom border-dark">
            <span class="text-muted">Total Supply: </span>
            <span v-if="result.market_data.total_supply">{{
              result.market_data.total_supply.toLocaleString()
            }}</span>
          </p>

          <p class="border-bottom border-dark">
            <span class="text-muted">Total Volume: </span>
            <span
              v-for="(cap, index) in Object.keys(
                result.market_data.total_volume
              )"
              :key="cap"
            >
              <span v-if="cap === currentCurrency">
                <span v-if="cap === 'usd'"
                  >$
                  {{
                    Object.values(result.market_data.total_volume)[
                      index
                    ].toLocaleString()
                  }}</span
                >
                <span v-else>
                  {{
                    Object.values(result.market_data.market_cap)[
                      index
                    ].toLocaleString()
                  }}
                  {{ currentCurrency }}
                </span>
              </span>
            </span>
          </p>

          <p class="border-bottom border-dark">
            <span class="text-muted">Max Supply: </span>
            <span v-if="result.market_data.max_supply">{{
              result.market_data.max_supply.toLocaleString()
            }}</span>
          </p>
        </div>
      </div>

      <div
        class="col-sm-10 col-md-7 col-lg-5 trends"
        v-if="trending && trending.coins"
      >
        <h3 class="mb-5">Trending Coins</h3>

        <div class="coins_container">
          <div
            class="coin-details col-8 d-flex align-items-center justify-content-between"
            v-for="(trend, index) in trending.coins"
            :key="trend.item.id"
          >
            <div class="c-info d-flex align-items-end gap-3">
              <div class="img trend_ico">
                <img :src="trend.item.small" :alt="trend.item.id" />
              </div>

              <div class="info ms-2">
                <h6 class="name mb-0">{{ trend.item.name }}</h6>
                <p class="text-muted text-small mb-0" style="font-size: 0.78em">
                  {{ trend.item.symbol }}
                </p>
              </div>
            </div>

            <div class="c-rates">
              <p class="trend_price mb-0">
                <sub class="text-muted text-uppercase">{{
                  currentCurrency
                }}</sub>
                {{ trend.item.price_btc.toFixed(6) }}
              </p>
              <p
                class="rate"
                style="color: var(--bs-teal)"
                v-if="trend.item.market_cap_rank % 100 > 0"
              >
                +{{ trend.item.market_cap_rank % 100 }}%
              </p>
              <p class="rate text-danger" v-else>
                {{ trend.item.market_cap_rank % 100 }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article class="py-5 px-2 row justify-content-between">
      <div
        class="categories col-sm-10 col-md-7 col-lg-7"
        v-if="result.categories"
      >
        <h3>Categories</h3>
        <ul
          class="category-container list-container px-0 py-3 col-8"
          v-if="result.categories.length > 0"
        >
          <li
            class="list-item badge bg-dark me-2"
            v-for="(tag, index) in result.categories"
            :key="tag"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <div class="price_performace col-sm-10 col-md-7 col-lg-5">
        <h4>Price Performance</h4>

        <div class="price_table py-3 col-">
          <header
            class="bg-dark rounded p-3 d-flex align-items-center justify-content-between text-white"
          >
            <div class="item">Change</div>
            <div class="item">Price</div>
          </header>
          <article class="content">
            <ul class="list price-list px-3 py-2">
              <li
                class="price-item d-flex align-items-center justify-content-between mb-3"
              >
                <span class="text-small">Today</span>
                <span class="text-small">
                  <span
                    v-for="(current_price_key, index) in Object.keys(
                      result.market_data.current_price
                    )"
                    :key="current_price_key"
                  >
                    <span v-if="currentCurrency === current_price_key">
                      <span v-if="currentCurrency === 'usd'"
                        >${{
                          Object.values(result.market_data.current_price)[index]
                        }}</span
                      >
                      <span v-else>
                        <sub class="text-muted me-1">{{ currentCurrency }}</sub>
                        {{
                          Object.values(result.market_data.current_price)[index]
                        }}
                      </span>
                    </span>
                  </span>
                </span>
              </li>

              <li
                class="price-item d-flex align-items-center justify-content-between mb-3"
              >
                <span class="text-small">24 Hours</span>
                <div class="text-small">
                  <div
                    v-for="(current_price_key, index) in Object.keys(
                      result.market_data.price_change_24h_in_currency
                    )"
                    :key="current_price_key"
                  >
                    <div v-if="currentCurrency === current_price_key">
                      <div
                        v-if="
                          Object.values(
                            result.market_data.price_change_24h_in_currency
                          )[index] > 0
                        "
                      >
                        <span v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data.price_change_24h_in_currency
                            )[index]
                          }}$</span
                        >
                        <span v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </span>
                      </div>

                      <div v-else class="text-danger">
                        <div v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data.price_change_24h_in_currency
                            )[index].toFixed(8)
                          }}$
                        </div>
                        <div v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="price-item d-flex align-items-center justify-content-between mb-3"
              >
                <span class="text-small">30 Days</span>
                <div class="text-small">
                  <div
                    v-for="(current_price_key, index) in Object.keys(
                      result.market_data.price_change_percentage_30d_in_currency
                    )"
                    :key="current_price_key"
                  >
                    <div v-if="currentCurrency === current_price_key">
                      <div
                        v-if="
                          Object.values(
                            result.market_data
                              .price_change_percentage_30d_in_currency
                          )[index] > 0
                        "
                      >
                        <span v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data
                                .price_change_percentage_30d_in_currency
                            )[index]
                          }}$</span
                        >
                        <span v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </span>
                      </div>

                      <div v-else class="text-danger">
                        <div v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data
                                .price_change_percentage_30d_in_currency
                            )[index].toFixed(8)
                          }}$
                        </div>
                        <div v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="price-item d-flex align-items-center justify-content-between mb-3"
              >
                <span class="text-small">60 Days</span>
                <div class="text-small">
             
                  <div
                    v-for="(current_price_key, index) in Object.keys(
                      result.market_data.price_change_percentage_60d_in_currency
                    )"
                    :key="current_price_key"
                  >
                    <div v-if="currentCurrency === current_price_key">
                      <div
                        v-if="
                          Object.values(
                            result.market_data
                              .price_change_percentage_60d_in_currency
                          )[index] > 0
                        "
                      >
                        <span v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data
                                .price_change_percentage_60d_in_currency
                            )[index]
                          }}$</span
                        >
                        <span v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </span>
                      </div>

                      <div v-else class="text-danger">
                        <div v-if="currentCurrency === 'usd'">
                          {{
                            Object.values(
                              result.market_data
                                .price_change_percentage_60d_in_currency
                            )[index].toFixed(8)
                          }}$
                        </div>
                        <div v-else>
                          <sub class="text-muted me-1">{{
                            currentCurrency
                          }}</sub>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <div
        class="price_performace col-sm-10 col-md-7 col-lg-10"
        v-if="result.description.en"
      >
        <h3>
          About <span class="text-capitallize"> {{ result.name }}</span>
        </h3>

        <p class="details" v-html="result.description.en"></p>
      </div>
    </article>
    <News_info />
  </section>
</template>

<script>
import News_info from '../../components/News_info.vue'
export default {
  components: {
    News_info,
  },
  head: {
    title: 'Coins Details',
  },
  data: () => ({
    result: '',
  }),
  async asyncData({ params, redirect }) {
    let result = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.slug}`
    ).then((res) => res.json())
    // console.log(result)
    return { result }
  },
  computed: {
    currentCurrency() {
      return this.$store.state.selected_currency
    },
    trending() {
      return this.$store.state.trending
    },
  },
  created() {
    let param = this.$route.params.slug
    setInterval(async function () {
      let res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${param}`
      ).then((res) => res.json())
      this.result = res

      // console.log(this.result)
    }, 15000)
    // console.log();
  },
}
</script>

<style scoped>
.img-thumbs {
  overflow: hidden;
}
.img-thumbs img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-gray-800);
}
.trends .coins_container {
  max-height: 300px;
  overflow-y: auto;
}
.trends .coins_container .coin-details {
  width: 100%;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  transition: 300ms ease;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
.trends .coins_container .coin-details:hover {
  background-color: var(--bs-gray-800);
}

.trend_ico,
.trend_ico img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>