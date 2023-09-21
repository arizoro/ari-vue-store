const db = require('../model')
const Order = db.orders

exports.findOrders = (req,res) => {
    const id = Number(req.params.id)

    Order.aggregate([
            {
                $match: {
                    user_id : id
                }
        },{
            $lookup : {
                from : 'products',
                localField : 'cart_items',
                foreignField : 'code',
                as : 'products'
            }
        }
    ])
    .then((result) => { res.send(result) })
    .catch((err) => { res.status(409).send({
        message : err.message || 'internal server error'
    }) })
}

exports.addToCart = (req, res) => {
    const id = Number(req.params.id)
    const productCode = String(req.body.product)

    Order.updateOne({
        user_id : id
    },{
        $addToSet : {
            cart_items : productCode
        }
    }
    )
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(409).send({
        message : err.message || 'error'
    }) })
}

exports.removeCart = (req,res) => {
    const id = Number(req.params.id)
    const productCode = String(req.params.product)
    console.log(productCode)

    Order.updateOne({
        user_id : id
    },{
        $pull : {
            cart_items : productCode
        }
    }
    )
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(409).send({
        message : err.message || 'error'
    }) })
}