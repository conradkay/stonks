import { defaultState, reducer, Stonk, State } from '../../exports'
import { selectReducer } from '../../reducers/selection'
import { createStore } from 'redux'
import * as actions from '../../actions'
// NOTE: Must use store.dispatch and selectReducer() in each test case
const store = createStore(reducer, defaultState)
describe('selection functions', () => {
  test('it selectsAllInCart', () => {
    const expectedOne: State = {
      ...defaultState,
      cart: defaultState.cart.map((stonk: Stonk) => {
        return { ...stonk, selected: true }
      })
    }
    expect(selectReducer(defaultState, actions.selectAllCart(), true)).toEqual(expectedOne)
  })
  test('it unselectsAllInCart', () => {
    const expectedTwo: State = {
      ...defaultState,
      cart: defaultState.cart.map((stonk: Stonk) => {
        return { ...stonk, selected: false }
      })
    }
    expect(selectReducer(defaultState, actions.unSelectAllCart(), false)).toEqual(expectedTwo)
  })
  test('it unselectsAllInventory', () => {
    expect(selectReducer(defaultState, actions.unSelectAllInventory(), false)).toEqual({
      ...defaultState,
      inventory: defaultState.inventory.map((stonk: Stonk) => {
        return { ...stonk, selected: false }
      })
    })
  })
  test('it selectsAllInventory', () => {
    expect(selectReducer(defaultState, actions.selectAllInventory(), true)).toEqual({
      ...defaultState,
      inventory: defaultState.inventory.map((stonk: Stonk) => {
        return { ...stonk, selected: true }
      })
    })
  })
  test('it selects stonk in inventory', () => {

  })
  test('it selects stonk in cart', () => {

  })
})
