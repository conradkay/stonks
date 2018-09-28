import { Action, Stonk, Variant } from './exports'
type AddCartAction = { type: 'ADD_TO_CART'; id: number; amount: number; stonk: Stonk }
export const addToCart = (stonk: Stonk, amount: number): AddCartAction => {
  const id: number = Math.floor((Math.random() * 100000000000))
  return { type: 'ADD_TO_CART', stonk, id, amount }
}
export const buyStonks = (): Action => ({ type: 'BUY_STONKS' })
export const sellStonks = (): Action => ({ type: 'SELL_STONKS' })
export const changeAmountShop = (amount: number, index: number): Action => ({
  type: 'CHANGE_AMOUNT_SHOP', amount, index
})
export const changeAmountCart = (amount: number, index: number): Action => ({
  type: 'CHANGE_AMOUNT_CART', amount, index
})
export const changeAmountInventory = (amount: number, index: number): Action => ({
  type: 'CHANGE_AMOUNT_INVENTORY', amount, index
})
export const unSelectAllInventory = (): Action => ({
  type: 'UNSELECT_ALL_INVENTORY'
})
export const selectAllInventory = (): Action => ({
  type: 'SELECT_ALL_INVENTORY'
})
export const selectStonkInInventory = (index: number): Action => ({
  type: 'SELECT_STONK_IN_INVENTORY',
  index: index
})
export const selectAllCart = (): Action => ({ type: 'SELECT_ALL_CART' })
export const unSelectAllCart = (): Action => ({ type: 'UNSELECT_ALL_CART' })
export const selectStonkInCart = (index: number): Action => ({ type: 'SELECT_STONK_IN_CART', index: index })
export const removeStonk = (index: number): Action => ({ type: 'REMOVE_STONK', index: index })

export const openSnackbar = (message: string, variant: Variant): Action => ({
  type: 'OPEN_SNACKBAR', message, variant
})

export const closeSnackbar = (): Action => ({ type: 'CLOSE_SNACKBAR' })
export const sellStonk = (): Action => ({ type: 'SELL_STONKS' })
