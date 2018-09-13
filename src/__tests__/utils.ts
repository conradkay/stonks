import { getStylesHeader, itemBetweenIndexes, getClassSnackbarVariant, generateOnes, defaultState, exampleStonk } from '../utils'
import { stonks } from '../exports'
describe('util functions', () => {
  test('getStylesHeader', () => {
    expect(getStylesHeader(true)).toEqual({ textDecoration: 'underline' })
    expect(getStylesHeader(false)).toEqual({})
  })
  test('itemBetweenIndexes', () => {
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 2, { hi: 2 })).toEqual([1, 2, { hi: 2 }, 4, 5])
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 4, 10)).toEqual([1, 2, 3, 4, 10])
    expect(itemBetweenIndexes([1, 2, 3, 4, 5], 0, 'hi')).toEqual(['hi', 2, 3, 4, 5])
  })
  test('getClassSnackbarVariant', () => {
    const classes = { success: 'success', warning: 'warning', error: 'error' }
    expect(getClassSnackbarVariant('success', classes)).toBe('success')
    expect(getClassSnackbarVariant('warning', classes)).toBe('warning')
    expect(getClassSnackbarVariant('error', classes)).toBe('error')
    // expect(getClassSnackbarVariant('hey', classes)).toBe('error') // works
  })
  test('generate ones :( such a sad function', () => {
    expect(generateOnes(10)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
  })
  test('defaultState', () => {
    expect(defaultState.amountStonksShop.length).toBe(25)
    expect(defaultState).toEqual({
      amountStonksShop: generateOnes(25),
      cart: [...stonks.slice(0, -1), { ...stonks[stonks.length - 1], selected: true }],
      inventory: [...stonks.slice(0, -1), { ...stonks[stonks.length - 1], selected: true }],
      activeFilters: [],
      money: 1000,
      snackbar: { open: false, message: 'dont show', variant: 'success' },
    })
  })
  test('exampleStonk', () => {
    expect(exampleStonk).toEqual({ amount: 2, id: 1, description: 'floopderop', price: 101, name: 'floop', pathToImage: 'https://', sellAmount: 1, selected: false })
  })
})
