// hello mate, this is the dev branch
import { Stonk, reducer } from 'src/exports'
import { defaultState, exampleStonk } from 'src/utils'
import * as actions from 'src/actions'
import { addToCart } from '../../reducers/addToCart'
import { createStore } from 'redux'
const store = createStore(reducer, defaultState)
beforeEach(() => {
  store.dispatch({ type: 'RESET' })
})
describe('reducer', () => {
  it('should add stonks to cart', () => {
    store.dispatch({ type: 'SET_STATE_TEST', newState: { ...defaultState, cart: [] } })
    store.dispatch(actions.addToCart(exampleStonk, 2)) // case 3, new stonk in empty cart
    expect(store.getState().cart).toEqual([{ ...exampleStonk, amount: 2, id: store.getState().cart[0].id }])
    store.dispatch({ type: 'RESET' }) // reset for other tests in it
    store.dispatch(actions.addToCart(exampleStonk, 9)) // case 1, new stonk
    store.dispatch(actions.addToCart(exampleStonk, 1)) // expect adding existing stonk to add to amount
    expect(store.getState()).toMatchSnapshot()
    const stonk = {
      ...exampleStonk,
      id: store.getState().cart[store.getState().cart.length - 1].id,
      amount: 12
    }
    const expected = [
      ...defaultState.inventory,
      stonk
    ]
    expect(store.getState().cart).toEqual(expected)
    expect(addToCart({ ...defaultState, cart: [] }, { ...actions.addToCart(stonk, 11), id: 1 }).cart).toEqual([{ ...stonk, id: 1 }])
  })
  it('should buy stonks', () => {

  })
  it('should sell stonks', () => {

  })
  it('should change amount in shop/cart/inventory', () => {

  })
  it('should select stonk in shop/cart/inventory', () => {

  })
  it('should select all in shop/cart/inventory', () => {

  })
  it('should unselect all in cart/inventory', () => {
    const expectedCart = store.getState().cart.map((stonk: Stonk) => {
      return { ...stonk, selected: false }
    })
    const expectedInventory = store.getState().inventory.map((stonk: Stonk) => {
      return { ...stonk, selected: false }
    })
    const expectedState = {
      ...defaultState,
      cart: expectedCart,
      inventory: expectedInventory
    }
    expect(store.getState()).not.toEqual(expectedState)
    store.dispatch(actions.unSelectAllCart())
    store.dispatch(actions.unSelectAllInventory())
    expect(store.getState()).toEqual(expectedState)
  })
  it('should open/close snackbar', () => {
    store.dispatch(actions.openSnackbar('hello', 'error'))
    expect(store.getState().snackbar).toEqual({ open: true, message: 'hello', variant: 'error' })
    store.dispatch(actions.closeSnackbar())
    expect(store.getState().snackbar).toEqual({ open: false, message: 'hello', variant: 'error' })
  })
  it('should return state when action is invalid', () => {
    store.dispatch({ type: 'floop' })
    expect(store.getState()).toEqual(defaultState)
  })
})
