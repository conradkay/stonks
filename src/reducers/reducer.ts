import { defaultState, State, Action, itemBetweenIndexes } from '../exports'
import { selectReducer } from './selection'
import { addToCart } from './addToCart'
import { sellStonks } from './sellStonks'
import { buyStonks } from './buyStonks'
/* TABLE OF CONTENTS:
* 11-23: AMOUNTS/INPUTS
* 28-37: SELECTS/CHECKBOXES
* 41-47: SNACKBAR
* 48-55: REMOVE STONK
* 55-170: ABSOLUTELY DISGUSTING FUNCTIONS
*/
export const rootReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return addToCart(state, action)
    case 'BUY_STONKS':
      return buyStonks(state, action)
    case 'SELL_STONKS':
      return sellStonks(state, action)
    case 'CHANGE_AMOUNT_INVENTORY':
      // if user has enough stonks to sell, then allow them to increment
      if (action.amount <= state.inventory[action.index].amount) {
        return {
          ...state,
          inventory: [...itemBetweenIndexes(state.inventory, action.index, { ...state.inventory[action.index], sellAmount: action.amount })]
        }
      }
      return {
        ...state,
        snackbar: {
          variant: 'warning', open: true, message: 'you do not have this many stonks'
        }
      }
    case 'CHANGE_AMOUNT_SHOP': // used in shot to see how much to add to cart
      return {
        ...state,
        amountStonksShop: [...itemBetweenIndexes(state.amountStonksShop, action.index, action.amount)]
      }
    case 'CHANGE_AMOUNT_CART': // used in cart to change amount to buy
      return {
        ...state,
        cart: [...itemBetweenIndexes(state.cart, action.index, { ...state.cart[action.index], amount: action.amount })]
      }
    case 'SELECT_ALL_CART':
      return selectReducer(state, action, true)
    case 'UNSELECT_ALL_CART':
      return selectReducer(state, action, false) // third arg not needed or used
    case 'SELECT_STONK_IN_INVENTORY':
    case 'SELECT_STONK_IN_CART':
      return selectReducer(state, action, false) // third arg not needed or used
    case 'SELECT_ALL_INVENTORY':
      return selectReducer(state, action, true)
    case 'UNSELECT_ALL_INVENTORY':
      return selectReducer(state, action, false)
    case 'OPEN_SNACKBAR':
      return {
        ...state,
        snackbar: { ...state.snackbar, open: true, message: action.message, variant: action.variant }
      }
    case 'CLOSE_SNACKBAR':
      return { ...state, snackbar: { ...state.snackbar, open: false } }
    case 'REMOVE_STONK': // do we even use this?
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, action.index),
          ...state.cart.slice(action.index + 1, state.cart.length)
        ]
      }
    case 'SET_STATE_TEST':
      console.log('SETTING STATE BADLY IF NOT TESTING STAHP reducer last classes')
      return action.newState
    case 'RESET':
      return { ...defaultState }
    default:
      return state
  }
}
