const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

const app = express()
const db = require('./app/model/index')

db.mongoose.connect(db.url)
.then((result) => { console.log('databes connected') })
.catch((err) => { console.log('gagal connect ',err) 
process.exit()})

app.use((req, res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,PATCH, DELETE, OPTION')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/img', express.static(path.join(__dirname, './app/public/img')))

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

app.get('/', (req,res) => {
    res.json({
        massage : 'welcome home'
    })
})

require('./app/routes/productRoute')(app)
require('./app/routes/orderRoute')(app)

app.listen(PORT, () => {
console.log(`server berjalan di port http://localhost:3000`)
})