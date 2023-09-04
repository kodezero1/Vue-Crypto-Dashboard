<template>
  <article>
    <header class="col-md-8 col-sm-10">
      <h1>Today's Crypto Market Rate</h1>
      <p class="text-muted">Stay Update with the latest market cap pricelist</p>
    </header>
    <br />
    <Trends />
    <br /> 
    <br /> 
    <MarketTable />
    <br /> 
    <News_info />
    <br /> 
  </article>
</template>
<script>
import News_info from '../components/News_info.vue';
export default {
    name: "IndexPage",
    components: { News_info }
}
</script>

<style></style>
