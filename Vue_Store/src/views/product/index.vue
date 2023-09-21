<template>
  <div id="page-wrap">
    <div class="grid-wrap">
      <ProductItem v-for="product in products"
      :key="product.id"
      :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from '../../components/ProductItem.vue';
export default {
  components : {
    ProductItem
  },
  data() {
    return {
      products : []
    }
  },
  async created(){
    const res = await axios.get('http://localhost:3000/api/products')
    this.products = res.data
  }
  
}
</script>

<style scoped>

  .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }

</style>