import { State, Variant, stonks, Stonk } from './exports'
/* used in header component as such and
*  <Link style={getStylesHeader(currComp === 'contact')} />
*/
export const getStylesHeader = (conditionTrue: boolean): { textDecoration: 'underline' } | {} => {
  if (conditionTrue) {
    return { textDecoration: 'underline' }
  }
  else {
    return {}
  }
}
// used as parent: [...itemBetweenIndexes(state.parent, 3, {})]
export const itemBetweenIndexes = (parent: Array<any>, index: number, newItem: any) => {
  return [...parent.slice(0, index), newItem, ...parent.slice(index + 1)]
}

export const getClassSnackbarVariant = (variant: Variant, classes: { success: string; warning: string; error: string }) => {
  // function to bypass rules on typescript [] notation, used in snackbarWrap component
  if (variant === 'success') {
    return classes.success
  }
  else if (variant === 'warning') {
    return classes.warning
  }
  else if (variant === 'error') {
    return classes.error
  }
  else {
    return classes.error
  }
}
export const generateOnes = (amount: number): number[] => { // generates some ones to put into state.shopAmounts
  const arr = [1]
  for (let i = 0; i < amount - 1; i++) {
    arr.push(1)
  }
  return arr
}
export const defaultState: State = {
  amountStonksShop: generateOnes(25),
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
  amount: 2,
  id: 1,
  description: `floopderop`,
  name: 'floop',
  price: 101,
  pathToImage: 'https://',
  sellAmount: 1,
  selected: false
}
