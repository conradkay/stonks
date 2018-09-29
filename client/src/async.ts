import { buyStonks, sellStonks, addToCart, store, Stonk } from './exports'
import { takeEvery, all } from 'redux-saga/effects'
// import axios from 'axios'

export function* postStonkToCart() {
  interface MyAction { type: 'POST_STONK_TO_CART', stonk: Stonk, amount: number }
  yield takeEvery('POST_STONK_TO_CART', (action: MyAction) => { // gets called on actions with type of 'POST_STONK_TO_CART'
    store.dispatch(addToCart(action.stonk, action.amount))
    console.log('add cart stonk YIELD triggerd')
    // return axios.post('/stonk/add-to-cart', store.getState())
  })
}
export function* buyStonkCartToInventory() {
  yield takeEvery('BUY_STONK_CART_TO_INVENTORY', () => {
    console.log('buy stonk YIELD triggerd')
    store.dispatch(buyStonks())
    // return axios.post('/stonk/buy-cart', store.getState())
  })
}
export function* sellStonkInventory() {
  yield takeEvery('SELL_STONK_INVENTORY', () => {
    console.log('buy stonk YIELD triggerd')
    store.dispatch(sellStonks())
    // return axios.post('/stonk/sell-inventory', store.getState())
  })
}
export function* runAll() {
  yield all([
    postStonkToCart(),
    buyStonkCartToInventory(),
    sellStonkInventory()
  ])
}
