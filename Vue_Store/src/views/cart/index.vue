<template>
    <div id="page-wrap">
      <div class="grid-wrap">

        <h1>shoping Cart</h1>
        <ShopingCart v-for="item in cartItems"
        :key="item.id"
        :item="item"
        v-on:remove-item="removeFromCart($event)"
        />
          <h3 id="total-price">Total: {{ totalPrice }}</h3>
          <button id="checkout-button">check out</button>
      </div>
    </div>
</template>

<script>
import ShopingCart from '../../components/ShopingCart.vue';
import axios from 'axios';
export default {

  components : {
    ShopingCart
  },
  data(){
    return {
      cartItems: []
    }
  },
  computed : {
    totalPrice(){
      return cartItems.reduce((sum, item) => sum + Number(item.price), 0)
    }
  },
  methods : {
    async removeFromCart(product){
      await axios.delete(`http://localhost:3000/api/orders/delete/user/1/product/${product}`)

      let indexCart = this.cartItems.map(function(item){
        return item.code
      }).indexOf(product)
      
      console.log(indexCart)
      this.cartItems.splice(indexCart,1)
    }
  },
  async created(){
    const res = await axios.get('http://localhost:3000/api/orders/user/1')
    const data = res.data[0]
    console.log(data)
    // let data = Object.assign({}, 
  //   ...(res.data.map(
  //     res => ({
  //       cart_items : res.products
  //     })
  //   )))
    this.cartItems = data.products
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

  h1 {
    border-bottom: 1px solid #41B883;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }
  #total-price {
    padding: 16px;
    text-align: right;
  }
  #checkout-button {
    width: 100%;
  }
</style>