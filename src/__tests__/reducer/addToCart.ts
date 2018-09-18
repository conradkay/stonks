import * as actions from '../../actions'
import { addToCart } from '../../reducers/addToCart'
import { exampleStonk, defaultState } from '../../utils'
import { stonks } from '../../exports'
const stonk = {
  ...exampleStonk,
  id: stonks[stonks.length - 1].id,
  amount: 1
}
describe('addToCart functions', () => {
  test('it works', () => {
    expect(addToCart(defaultState, { ...actions.addToCart(stonk, 11), id: 1 }).cart).toEqual([...defaultState.cart, { ...stonk, id: 2, amount: 12 }])
    expect(addToCart({ ...defaultState, cart: [] }, { ...actions.addToCart(stonk, 11), id: 1 }).cart).toEqual([{ ...stonk, id: 1 }])
  })
})
