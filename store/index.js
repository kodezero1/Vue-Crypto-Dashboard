export const state = () => ({
  selected_currency: 'usd',
  currencies: [],
  coin_market: [],
  coin_list: [],
  trending: []
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  getCurrency(state) {
    return state.selected_currency
  },
}

export const mutations = {
  Set_currency(states, payload) {
    states.currencies = payload
  },

  change_currency(states, payload) {
    states.coin_market = [];
    states.selected_currency = payload;
    this.dispatch('coin_market')
    return states.selected_currency
  },

  Coin_Market(s, payload) {
    s.coin_market = payload
  },
  Set_trends(s, payload) {
    s.trending = payload;
  }
}

export const actions = {
  async coin_market(context) {
    let req = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${context.state.selected_currency}&order=market_cap_desc&per_page=200&page=1&sparkline=true`
    )
    context.commit('Coin_Market', await req.json());
  },
  async trends(context) {
    let result = await this.$axios.get('https://api.coingecko.com/api/v3/search/trending');
    context.commit("Set_trends", result.data);
  }
}
