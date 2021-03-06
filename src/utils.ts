import { State, Variant, stonks, Stonk } from './exports'
/* used in header component as such and
*  <Link style={getStylesHeader(currComp === 'contact')} />
*/
export const getStylesHeader = (conditionTrue: boolean): { textDecoration: 'underline' } | {} => {
  if (conditionTrue) {
    return { textDecoration: 'underline' }
  }
  else {
    return {} // no styles
  }
}
// used as parent: [...itemBetweenIndexes(state.parent, 3, {})]
export const itemBetweenIndexes = (parent: any[], index: number, newItem: any) => {
  return [...parent.slice(0, index), newItem, ...parent.slice(index + 1)]
}

export const getClassSnackbarVariant = (variant: Variant, classes: { success: string; warning: string; error: string }) => {
  // function to bypass rules on typescript [] notation, used in snackbarWrap component
  if (variant === 'success') { return classes.success }
  else if (variant === 'warning') { return classes.warning }
  else if (variant === 'error') { return classes.error }
  else { return classes.error }
}
export const generateNum = (amount: number, num: number): number[] => { // generates some ones to put into state.shopAmounts
  const arr = [num]
  for (let i = 0; i < amount - 1; i++) {
    arr.push(num)
  }
  return arr
}
export const defaultState: State = {
  amountStonksShop: generateNum(stonks.length, 1), // This is SO sad
  cart: [
    ...stonks.slice(0, -1),
    { ...stonks[stonks.length - 1], selected: true }
  ],
  inventory: [
    ...stonks.slice(0, -1),
    { ...stonks[stonks.length - 1], selected: true }
  ],
  activeFilters: [],
  money: 1000,
  snackbar: { open: false, message: 'dont show', variant: 'success' },
}
export const exampleStonk: Stonk = {
  prices: [{ date: '1 year', price: 170 }, { date: '6 month', price: 150 }, { date: '3 months', price: 130.4 }, { date: '1 month', price: 120 }],

  amount: 2,
  id: 1,
  description: `floopderop`,
  name: 'floop',
  price: 101,
  pathToImage: 'https://',
  sellAmount: 1,
  selected: false
}
// Takes whether stonks should be selected, and whether or not we are testing cart(if false then inventory)
export const createExpected = (selected: boolean, cart: boolean) => {
  if (cart) {
    return {
      ...defaultState,
      cart: defaultState.cart.map((stonk: Stonk) => {
        return { ...stonk, selected }
      })
    }
  }
  return {
    ...defaultState,
    inventory: defaultState.inventory.map((stonk: Stonk) => {
      return { ...stonk, selected }
    })
  }
}
