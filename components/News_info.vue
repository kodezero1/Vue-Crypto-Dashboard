<template>
  <CardContainer title="News & More">
    <div class="slider sm-noslide pt-2">
      <div
        class="card justify-content-between wrap col-sm-8 col-md-12 col-lg-7 me-2 px-3"
      >
        <div class="des col-8">
          <h5>Crypto News</h5>
          <p class="details text-small col-10">
            Take a look at what is currently going on with the crypto market,
            and keep yourself updated
          </p>
          <a href="https://www.binance.com/en/news" ref="no-referer" target="_blank" class="btn btn-primary">Read</a>
        </div>

        <div class="img-thumbs">
          <img
            src="https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=200&q=60"
            alt="crypto market"
            class="img-thumb w-100 rounded"
          />
        </div>
      </div>

      <div class="card justify-content-between wrap col-sm-12 col-md-9 col-lg-7 px-3">
        <div class="des col-8">
          <h5>Exchange Rates</h5>
          <p class="details text-small col-10">
            Find out the top trending Market Exchange rates
          </p>
          <nuxt-link :to="{path:'/exchange', hash:'#exchange_rates'}" class="btn btn-warning">Open</nuxt-link>
        </div>

        <div class="img-thumbs">
          <img
            src="https://images.unsplash.com/photo-1629339938591-ec5e73815e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=200&q=60"
            alt="crypto market"
            class="img-thumb w-100 rounded"
          />
        </div>
      </div>
    </div>
  </CardContainer>
</template>

<script>
export default {
  name: 'news_info',
}
</script>

<style lang="scss" scoped></style>
