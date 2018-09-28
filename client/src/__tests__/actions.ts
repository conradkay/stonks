import * as actions from '../actions'
import { exampleStonk } from '../utils'
describe('core actions', () => {
  it('add to cart action', () => {
    expect(actions.addToCart(exampleStonk, 2).id.toString().length).toBeGreaterThanOrEqual(9)
    expect({ ...actions.addToCart(exampleStonk, 2), id: 3 }).toMatchSnapshot()
  })
  it('buy stonks action', () => expect(actions.buyStonks()).toMatchSnapshot())
  it('sell stonks action', () => expect(actions.sellStonks).toMatchSnapshot())
  it('change amount shop action', () => expect(actions.changeAmountShop(3, 2)).toMatchSnapshot())
  it('change amount cart action', () => expect(actions.changeAmountCart(3, 20)).toMatchSnapshot())
  it('change amount inventory action', () => expect(actions.changeAmountInventory(4, 40)).toMatchSnapshot())
  it('unSelectAllInventory/unSelectAllCart', () => {
    expect(actions.unSelectAllInventory()).toMatchSnapshot()
    expect(actions.selectAllCart()).toMatchSnapshot()
  })
  it('selectAllCart/selectAllInventorys', () => {
    expect(actions.selectAllCart()).toMatchSnapshot()
    expect(actions.selectAllInventory()).toMatchSnapshot()
  })
  it('selectStonkInInventory/selectStonkInCart action', () => {
    expect(actions.selectStonkInInventory(3)).toMatchSnapshot()
    expect(actions.selectStonkInCart(4)).toMatchSnapshot()
  })
  it('removeStonk action', () => {
    expect(actions.removeStonk(45)).toMatchSnapshot()
  })
  it('openSnackbar/closeSnackbar action', () => {
    expect(actions.openSnackbar('msg', 'success')).toMatchSnapshot()
    expect(actions.closeSnackbar()).toMatchSnapshot()
  })
})
