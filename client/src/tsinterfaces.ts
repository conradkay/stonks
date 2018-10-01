export type Action = Readonly<{ type: 'ADD_TO_CART'; stonk: Stonk; id: number; amount: number }
  | { type: 'BUY_STONKS' }
  // is a saga and testing action OOPS, scalability bitches
  | { type: 'SET_STATE_TEST'; newState: State }
  | { type: 'SELL_STONKS' }
  | { type: 'CHANGE_AMOUNT_SHOP'; index: number; amount: number }
  | { type: 'CHANGE_AMOUNT_CART'; index: number; amount: number }
  | { type: 'CHANGE_AMOUNT_INVENTORY'; index: number; amount: number }
  | { type: 'SELECT_ALL_INVENTORY' }
  | { type: 'UNSELECT_ALL_INVENTORY' }
  | { type: 'SELECT_ALL_CART' }
  | { type: 'UNSELECT_ALL_CART' }
  | { type: 'SELECT_STONK_IN_INVENTORY'; index: number }
  | { type: 'SELECT_STONK_IN_CART'; index: number }
  | { type: 'REMOVE_STONK'; index: number }
  | { type: 'OPEN_SNACKBAR'; message: string; variant: Variant }
  | { type: 'CLOSE_SNACKBAR' }
  | { type: 'RESET' }
  // saga actions
  | { type: 'POST_STONK_TO_CART', stonk: Stonk, amount: number }
  | { type: 'BUY_STONK_CART_TO_INVENTORY' }
  | { type: 'SELL_STONK_INVENTORY' }>
export { Dispatch } from 'redux'
export interface Stonk {
  readonly prices: Array<{ date: string; price: number }>
  readonly pathToImage: string
  readonly sellAmount: number
  readonly amount: number
  readonly price: number
  readonly name: string
  readonly description: string
  readonly id: number
  readonly selected: boolean
}
export type Stonks = Stonk[]
export type Variant = 'error' | 'warning' | 'success'
export interface SnackBar {
  readonly open: boolean
  readonly message: string
  readonly variant: Variant
}

export interface State {
  readonly amountStonksShop: number[]
  readonly cart: Stonks
  readonly snackbar: SnackBar
  readonly inventory: Stonks
  readonly money: number
}
