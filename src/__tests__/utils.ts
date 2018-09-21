import { getStylesHeader, itemBetweenIndexes, getClassSnackbarVariant, generateNum, defaultState, exampleStonk } from '../utils'
import { stonks } from '../exports'
describe('util functions', () => {
  it('getStylesHeader', () => {
    expect(getStylesHeader(true)).toEqual({ textDecoration: 'underline' })
    expect(getStylesHeader(false)).toEqual({})
  })
  it('itemBetweenIndexes', () => {
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 2, { hi: 2 })).toEqual([1, 2, { hi: 2 }, 4, 5])
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 4, 10)).toEqual([1, 2, 3, 4, 10])
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 0, 'hi')).toEqual(['hi', 2, 3, 4, 5])
  })
  it('getClassSnackbarVariant', () => {
    const classes = { success: 'success', warning: 'warning', error: 'error' }
    expect(getClassSnackbarVariant('success', classes)).toBe('success')
    expect(getClassSnackbarVariant('warning', classes)).toBe('warning')
    expect(getClassSnackbarVariant('error', classes)).toBe('error')
    // expect(getClassSnackbarVariant('hey', classes)).toBe('error') // works
  })
  it('generate ones :( such a sad function', () => {
    expect(generateNum(10, 1)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })
  it('defaultState', () => {
    expect(defaultState.amountStonksShop.length).toBe(25)
    expect(defaultState).toEqual({
      amountStonksShop: generateNum(25, 1),
      cart: [...stonks.slice(0, -1), { ...stonks[stonks.length - 1], selected: true }],
      inventory: [...stonks.slice(0, -1), { ...stonks[stonks.length - 1], selected: true }],
      activeFilters: [],
      money: 1000,
      snackbar: { open: false, message: 'dont show', variant: 'success' },
    })
  })
  it('exampleStonk', () => {
    expect(exampleStonk).toEqual({ amount: 2, id: 1, description: 'floopderop', price: 101, name: 'floop', pathToImage: 'https://', sellAmount: 1, selected: false })
  })
})
