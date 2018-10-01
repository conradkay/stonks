const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

mongoose.connect('mongodb://cokay101:cokay101@ds115753.mlab.com:15753/stonk', {useNewUrlParser: true})

const stonkSchema = mongoose.Schema({
  prices: [{date: String, price: Number}],
  pathToImage: String,
  name: String,
  selected: Boolean,
  price: Number,
  sellAmount: Number,
  id: Number,
  description: String,
  amount: String
})

const inventorySchema = mongoose.Schema({
  cart: [stonkSchema]
})
const cartSchema = mongoose.Schema({
  inventory: [stonkSchema]
})
const moneySchema = mongoose.Schema({
  money: Number
})

const Cart = mongoose.model('cartItem', stonkSchema)
const Inventory = mongoose.model('inventoryItem', stonkSchema)
const Money = mongoose.model('singleMoney', moneySchema)
const jsonParser = bodyParser.json()

const deleteAndNew = (newData) => {
  Cart.deleteMany({}, () => {})
  Inventory.deleteMany({}, () => {})
  Money.deleteMany({}, () => {})
  newData.cart.map(stonk => {
    Cart.create(stonk)
  })
  newData.inventory.map(stonk => {
    Inventory.create(stonk)
  })
  Money.create({money: newData.money})
}
app.get('/state', (req) => {
  
})
app.post('/stonk/sell-inventory', jsonParser, (req) => {
  console.log('Selling stonk in inventory')
  deleteAndNew(req.body)
})
app.post('/stonk/buy-cart', jsonParser, (req) => {
  console.log('POSTING STONK CART SERVER')
  deleteAndNew(req.body)
})
app.post('/stonk/add-to-cart', jsonParser, (req) => {
  console.log('ADDING A STONK TO CART IN DB SERVER')
  deleteAndNew(req.body)
})

app.listen(5000)
