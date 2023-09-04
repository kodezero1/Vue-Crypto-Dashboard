<template>
  <CardContainer title="Market Data" :responsive="true">
    <Tableu
      :columns="tbColumns"
      :datas="coinMarket"
      :paginate="true"
      :divide="true"
    >
      <template #td="{ data }">
        <td class="border-0">
          <span class="bi bi-star me-1"></span>
          <span>{{ data.market_cap_rank }}</span>
        </td>

        <td class="border-0 nowrap me-2">
          <div class="d-flex align-items-center">
            <div
              class="img bg-dark me-2"
              style="width: 40px; height: 40px; border-radius: 50%"
            >
              <img
                :src="data.image"
                class="img-thumbnail bg-transparent border-0"
                :alt="data.symbol"
                loading="lazy"
                style="width: 40px"
              />
            </div>
            <nuxt-link :to="'/coins/' + data.id" class="text-white">{{
              data.name
            }}</nuxt-link>
            <sup class="text-muted ms-2">{{ data.symbol }}</sup>
          </div>
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency === 'usd'">$</span>
          <span v-else-if="currency === 'btc'">
            <i class="bi bi-currency-bitcoin"></i>
          </span>
          <span v-else-if="currency === 'eth'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="20"
              fill="#fff"
            >
              <path
                d="M21 22h-3a7 7 0 0 1-6.31-4H18a1 1 0 0 0 0-2h-6.92a6.29 6.29 0 0 1 0-2H19a1 1 0 0 0 0-2h-7.31A7 7 0 0 1 18 8h3a1 1 0 0 0 0-2h-3a9 9 0 0 0-8.47 6H7a1 1 0 0 0 0 2h2.06a8.36 8.36 0 0 0 0 2H6a1 1 0 0 0 0 2h3.53A9 9 0 0 0 18 24h3a1 1 0 0 0 0-2Z"
              />
            </svg>
          </span>
          <span class="text-muted text-uppercase" v-else>{{ currency }}</span>
          {{ data.current_price.toLocaleString() }}
        </td>

        <td class="border-0">
          <span
            class="text-danger"
            v-if="
              data.price_change_percentage_24h !== null &&
              data.price_change_percentage_24h < 0
            "
            >{{ data.price_change_percentage_24h.toFixed(2) }}%
            <i class="bi bi-caret-down-fill me-2"></i
          ></span>
          <span
            style="color: var(--bs-teal)"
            v-else-if="
              data.price_change_percentage_24h !== null &&
              data.price_change_percentage_24h >= 0
            "
            >{{ data.price_change_percentage_24h.toFixed(1) }}%
            <i class="bi bi-caret-up-fill me-2"></i>
          </span>
        </td>

        <td class="border-0">
          <span
            class="text-danger"
            v-if="data.ath_change_percentage && data.ath_change_percentage < 0"
            >{{ data.ath_change_percentage.toFixed(1) }}%
            <i class="bi bi-caret-down-fill me-2"></i
          ></span>
          <span
            style="color: var(--bs-teal)"
            v-else-if="
              data.ath_change_percentage && data.ath_change_percentage >= 0
            "
            >{{ data.ath_change_percentage.toFixed(1) }}%
            <i class="bi bi-caret-up-fill me-2"></i>
          </span>
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency == 'usd'">$</span>
          <span v-else-if="currency === 'btc'">
            <i class="bi bi-currency-bitcoin"></i>
          </span>
          <span v-else-if="currency === 'eth'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="20"
              fill="#fff"
            >
              <path
                d="M21 22h-3a7 7 0 0 1-6.31-4H18a1 1 0 0 0 0-2h-6.92a6.29 6.29 0 0 1 0-2H19a1 1 0 0 0 0-2h-7.31A7 7 0 0 1 18 8h3a1 1 0 0 0 0-2h-3a9 9 0 0 0-8.47 6H7a1 1 0 0 0 0 2h2.06a8.36 8.36 0 0 0 0 2H6a1 1 0 0 0 0 2h3.53A9 9 0 0 0 18 24h3a1 1 0 0 0 0-2Z"
              />
            </svg>
          </span>
          <span class="text-muted text-uppercase" v-else>{{ currency }}</span>
          {{ data.total_volume.toLocaleString() }}
        </td>

        <td class="border-0 nowrap">
          <span v-if="currency === 'usd'">$</span>
          <span v-if="currency === 'btc'"
            ><i class="bi bi-currency-bitcoin"></i
          ></span>
          <span v-if="currency === 'eth'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="20"
              fill="#fff"
            >
              <path
                d="M21 22h-3a7 7 0 0 1-6.31-4H18a1 1 0 0 0 0-2h-6.92a6.29 6.29 0 0 1 0-2H19a1 1 0 0 0 0-2h-7.31A7 7 0 0 1 18 8h3a1 1 0 0 0 0-2h-3a9 9 0 0 0-8.47 6H7a1 1 0 0 0 0 2h2.06a8.36 8.36 0 0 0 0 2H6a1 1 0 0 0 0 2h3.53A9 9 0 0 0 18 24h3a1 1 0 0 0 0-2Z"
              />
            </svg>
          </span>
          {{ data.market_cap.toLocaleString() }}
        </td>
      </template>
    </Tableu>
    <br />
  </CardContainer>
</template>

<script>
export default {
  data() {
    return {
      tbColumns: [
        {
          title: 'Rank',
        },
        {
          title: 'Coin',
        },
        {
          title: 'Price',
          key: 'lastPrice',
        },
        {
          title: '24hr',
        },
        {
          title: 'ATH',
        },
        {
          title: 'Volume',
        },
        {
          title: 'Mkt Cap',
        },
      ],
      coinMarket: [],
    }
  },

  computed: {
    currency() {
      return this.$store.state.selected_currency
    },
    market() {
      return this.$store.state.coin_market
    },
  },

  watch: {
    market(e) {
      this.coinMarket = e
    },
  },
  async created() {
    try {
      this.$store.dispatch('coin_market')
      setInterval(() => {
        this.$store.dispatch('coin_market')
      }, 6000)
    } catch (error) {
      this.$Notice.open({ title: error, type: 'error' })
    }
  },
}
</script>

<style lang="scss" scoped></style>