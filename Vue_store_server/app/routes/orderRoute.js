module.exports = (app) => {
    const orders = require('../controller/orderController')
    const router = require('express').Router()

    router.get('/user/:id', orders.findOrders)
    router.post('/user/:id/add', orders.addToCart)
    router.delete('/delete/user/:id/product/:product', orders.removeCart)

    app.use('/api/orders', router)
}