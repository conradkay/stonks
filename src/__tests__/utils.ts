import { getStylesHeader, itemBetweenIndexes, getClassSnackbarVariant, generateOnes } from '../utils'

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
})
