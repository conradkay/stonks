import { Stonk, State, itemBetweenIndexes } from '../exports'
import { findIndex } from 'lodash'
/*
*@type: reducer case utility
*@Usage: case: 'ADD_TO_CART' in root reducer
*/
type AddCartAction = { type: 'ADD_TO_CART'; stonk: Stonk; id: number; amount: number }
export const addToCart = (state: State, action: AddCartAction): State => {
  let newerCart: Stonk[] = []
  if (state.cart.length === 0) { // CASE 1, cart is empty
    newerCart = [{ ...action.stonk, id: action.id }]
  }
  const index: number = findIndex(state.cart, (i: any) => i.name === action.stonk.name)
  if (index >= 0) { // CASE 2, cart has stonk already
    newerCart = itemBetweenIndexes(
      state.cart,
      index,
      { ...action.stonk, amount: state.cart[index].amount + action.amount }
    )
  }
  if (index === -1 && state.cart.length >= 1) { // CASE 3, stonk is new, cart not empty
    newerCart = [...state.cart, { ...action.stonk, amount: action.amount + action.stonk.amount }]
  }
  return {
    ...state,
    cart: newerCart
  }
}
