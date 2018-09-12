import { State, Stonk, SnackBar } from '../exports'

export const buyStonks = (state: State, action: { type: 'BUY_STONKS' }): State => {
  // will always display not able to afford in snackbar
  let newInventory: Stonk[] = state.inventory
  let newMoney: number = state.money
  const errorSnack: SnackBar = { open: true, message: 'no money/none selected', variant: 'error' }
  let newSnack: SnackBar = { open: true, message: 'stonks bought successfully', variant: 'success' }
  const newCart: Stonk[] = state.cart.filter((stonk: Stonk) => {
    if (stonk.selected && (stonk.price * stonk.amount) > newMoney) {
      newSnack = errorSnack
      return true // keep in cart and give error
    }
    else if (stonk.selected) {
      let index = 0
      newMoney -= (stonk.price * stonk.amount)
      if (state.inventory.filter((newStonk: Stonk) => {
        if (newStonk.name === stonk.name) {
          index = state.inventory.indexOf(newStonk)
          return true
        }
        return false
      }).length > 0) { // index will HAVE to exist as length is > 1 and index is delcared in returning true yee
        const invStonk: Stonk = state.inventory[index]
        newInventory = [
          ...newInventory.slice(0, index),
          {
            ...stonk, selected: invStonk.selected, sellAmount: stonk.amount + invStonk.amount,
            amount: invStonk.amount + stonk.amount
          },
          ...newInventory.slice(index + 1)
        ]
      }
      else {
        newInventory.push(stonk)
      }
    }
    return stonk.selected === false
    // only keep NOT buyings or buying stonks that cannot be afforded
  })
  if (newCart.length === state.cart.length) {
    newSnack = { ...errorSnack }
  }
  return {
    ...state,
    cart: newCart, inventory: newInventory,
    money: newMoney, snackbar: newSnack
  }
}
