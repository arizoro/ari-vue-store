<template>
  <div>
    <div id="page-wrap" v-if="product">
      <h4 v-if="notif" class="notif">Product added successfully</h4>
      <div id="img-wrap">
        <img :src="`http://localhost:3000${product.imageUrl}`" alt="">
      </div>
      <div id="product-details"  >
        <h1>{{ product.name }}</h1>
        <h3 id="price">{{ product.price }}</h3>
        <p>Avarege rating : {{ product.averageRating }}</p>
        <button id="add-to-cart" @click="addToCart(product.code)" >Add to cart</button>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <NotFound v-else/>
  </div>
</template>

<script>
import axios from 'axios'
// import {products} from '../../data-seed'
import NotFound from '../errors/404.vue'
export default {
  components : {
    NotFound
  },
  data(){
    return {
      product : {},
      notif : false
    }
  },
  async created(){
    const code = this.$route.params.id
    const res = await axios.get(`http://localhost:3000/api/products/${code}`)
    this.product = res.data
  },
  methods : {
    async addToCart(product){
      await axios.post('http://localhost:3000/api/orders/user/1/add',{
        product : product
      })
      this.notif = true
    }
  },
  // computed: {
  //   product(){
  //     return this.products.find((p) => {
  //       return p.id === this.$route.params.id
  //     })
  //   }
  // },
  mounted(){
    console.log(this.product)
  }

}
</script>

<style scoped >
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }
  .notif {
    text-align: center;
    color: white;
    background-color:#41B883;
    padding: 3%;
    border-radius: 8px;
    margin-bottom: 8px;
  }
</style>