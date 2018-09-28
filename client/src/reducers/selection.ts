import { State, Action, itemBetweenIndexes, Stonk } from '../exports'
/*
* @Params: state = full redux state, action = action called in root reducer, bool = whether or not selecting or not
* @Returns: new redux state
* @Utils: itemBetweenIndexes(parent: array to measure, index; index to put between, item)
*/
export const selectReducer = (state: State, action: Action, bool: boolean): State => {
  switch (action.type) {
    case 'SELECT_ALL_INVENTORY':
    case 'UNSELECT_ALL_INVENTORY':
      return {
        ...state,
        inventory: state.inventory.map((stonk: Stonk) => {
          return { ...stonk, selected: bool }
        })
      }
    case 'SELECT_ALL_CART':
    case 'UNSELECT_ALL_CART':
      return {
        ...state,
        cart: state.cart.map((stonk: Stonk) => {
          return { ...stonk, selected: bool }
        })
      }
    case 'SELECT_STONK_IN_INVENTORY':
      return {
        ...state,
        inventory: itemBetweenIndexes(
          state.inventory,
          action.index,
          { ...state.inventory[action.index], selected: !state.inventory[action.index].selected }
        )
      }
    case 'SELECT_STONK_IN_CART':
      return {
        ...state,
        cart: itemBetweenIndexes(
          state.cart,
          action.index,
          { ...state.cart[action.index], selected: !state.cart[action.index].selected }
        )
      }
    default: return state
  }
}
