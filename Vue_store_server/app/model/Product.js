module.exports = mongoose => {
    const ProductSchema =  mongoose.Schema({
        code : String,
        name : String,
        price : Number,
        description : String,
        imageUrl: String,
        avarageRating : Number
    
    })
    
    ProductSchema.method('toJSON', function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })
    
    const Product = mongoose.model('products', ProductSchema)

    return Product
}

