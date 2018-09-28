import { defaultState, reducer, State, createExpected, Stonk } from '../../exports'
import { selectReducer } from '../../reducers/selection'
import { createStore } from 'redux'
import * as actions from '../../actions'

const store = createStore(reducer, defaultState)
// NOTE: Must use store.dispatch and selectReducer() in each test case
beforeEach(() => {
  store.dispatch({ type: 'RESET' })
})
describe('selection functions', () => {
  const length = defaultState.inventory.length // - 1
  test('createExpected test util works', () => {

  })

  test('it selectsAllInCart', () => {
    const expected: State = createExpected(true, true)
    store.dispatch(actions.selectAllCart())
    expect(store.getState()).toEqual(expected)
    expect(selectReducer(defaultState, actions.selectAllCart(), true)).toEqual(expected)
  })
  test('it unselectsAllInCart', () => {
    const expected: State = createExpected(false, true)
    store.dispatch(actions.unSelectAllCart())
    expect(store.getState()).toEqual(expected)
    expect(selectReducer(defaultState, actions.unSelectAllCart(), false)).toEqual(expected)
  })

  test('it selectsAllInventory', () => {
    const expected: State = createExpected(true, false)
    store.dispatch(actions.selectAllInventory())
    expect(store.getState()).toEqual(expected)
    expect(selectReducer(defaultState, actions.selectAllInventory(), true)).toEqual(expected)
  })
  test('it unselectsAllInventory', () => {
    const expected: State = createExpected(false, false)
    store.dispatch(actions.unSelectAllInventory())
    expect(store.getState()).toEqual(expected)
    expect(selectReducer(defaultState, actions.unSelectAllInventory(), false)).toEqual(expected)
  })
  test('it selects then unselects firststonk in inventory', () => {
    const expectedFirstSelected: Stonk[] = [{ ...defaultState.inventory[0], selected: true }, ...defaultState.inventory.slice(1)]
    const expectedFirstUnselected: Stonk[] = [{ ...defaultState.inventory[0], selected: false }, ...defaultState.inventory.slice(1)]
    store.dispatch(actions.selectStonkInInventory(0))
    expect(store.getState().inventory).toEqual(expectedFirstSelected)
    store.dispatch(actions.selectStonkInInventory(0))
    expect(store.getState().inventory).toEqual(expectedFirstUnselected)
  })
  test('it unselects last stonk in inventory', () => {
    const expectedLastUnselected: Stonk[] = [...defaultState.inventory.slice(0, length - 1), { ...defaultState.inventory[length - 1], selected: false }]
    store.dispatch(actions.selectStonkInInventory(defaultState.inventory.length - 1))
    expect(store.getState().inventory).toEqual(expectedLastUnselected)
  })
  test('it selects middle stonk in inventory', () => {
    // remember, the last element is selected already in inventory
    const expectedMiddleSelected: Stonk[] = [
      ...defaultState.inventory.slice(0, 1), // returns first
      { ...defaultState.inventory[1], selected: true }, // second element
      ...defaultState.inventory.slice(2) // the rest
    ]
    store.dispatch(actions.selectStonkInInventory(1))
    expect(store.getState().inventory).toEqual(expectedMiddleSelected)
  })
  test('it selects/unselects middle stonk in CART', () => { // no need for edge cases as cart and inventory same thing
    const expectedMiddleSelectedCart: Stonk[] = [
      ...defaultState.cart.slice(0, 1),
      { ...defaultState.cart[1], selected: true },
      ...defaultState.cart.slice(2)
    ]
    store.dispatch(actions.selectStonkInCart(1))
    expect(store.getState().cart).toEqual(expectedMiddleSelectedCart)
  })
})
