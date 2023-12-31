const dbConfig = require('../../config/dbConfig')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.url = dbConfig.url
db.products = require('./Product')(mongoose)
db.orders = require('./Order')(mongoose)

module.exports = db