import { buyStonks, sellStonks, addToCart, store, Stonk } from './exports'
import axios from 'axios'

export const postStonkToCart = (stonk: Stonk, amount: number) => {
  return (dispatch: any) => {
    dispatch(addToCart(stonk, amount))
    return axios.post('/stonk/add-to-cart', store.getState()) // use store.getState() to access state
  }
}
export const buyStonkCartToInventory = () => {
  return (dispatch: any) => {
    dispatch(buyStonks())
    return axios.post('/stonk/buy-cart', store.getState())// use store.getState() to access state
  }
}
export const sellStonkInventory = () => {
  return (dispatch: any) => {
    dispatch(sellStonks())
    return axios.post('/stonk/sell-inventory', store.getState()) // use store.getState() to access state
  }
}
