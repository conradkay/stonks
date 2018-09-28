import { State, SnackBar, Stonk } from '../exports'
type SellStonksAction = { type: 'SELL_STONKS' }
/*
* CASE 1: Users have no stonks selected, return error message
* CASE 2+3: User has any stonks selected
* newInv = stonks to keep in Inventory
* betterInventory = stonks we are not using
*/
export const sellStonks = (state: State, action: SellStonksAction): State => {
  let newMon: number = state.money
  const successBar: SnackBar = { ...state.snackbar, open: true, message: 'sold stonks successfully', variant: 'success' }
  let newSnackbar: SnackBar = successBar

  let newInv: Stonk[] = state.inventory.filter((stonk: Stonk, times: number) => {
    return !stonk.selected || stonk.sellAmount <= stonk.amount
    // only keep not selling stonks or stonks we aren't fully buying.
  })
  newInv = newInv.map((stonk: Stonk) => { // case 2: we can sell only SOME of stonks
    if (stonk.sellAmount < stonk.amount) {
      return { ...stonk, amount: stonk.amount - stonk.sellAmount, sellAmount: stonk.amount - stonk.sellAmount }
    }
    return stonk
  })
  const betterInv: Stonk[] = state.inventory.filter((stonk: Stonk) => {
    return stonk.selected // keeps stonks we are selling, only for util purposes
  })
  if (betterInv.length < 1) { // CASE 1: if users have no stonks selected
    newSnackbar = { ...newSnackbar, message: 'no stonks selected', variant: 'warning' }
  }
  betterInv.map((stonk: Stonk) => {
    newSnackbar = successBar
    newMon += stonk.price * stonk.sellAmount
  })
  newInv = newInv.filter((stonk: Stonk) => !betterInv.includes(stonk)) // WARNING: keep this at the end

  return {
    ...state,
    snackbar: newSnackbar,
    money: newMon,
    inventory: newInv
  }
}
