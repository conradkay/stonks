import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, Variant, openSnackbar, changeAmountShop, changeAmountCart, changeAmountInventory } from '../exports'
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShopValue: (index: number, amount: number) => dispatch(changeAmountShop(index, amount)),
  setInventoryValue: (index: number, amount: number) => dispatch(changeAmountInventory(amount, index)),
  setCartValue: (index: number, amount: number) => dispatch(changeAmountCart(amount, index)),
  openSnackbar: (message: string, variant: Variant) => dispatch(openSnackbar(message, variant))
})
type Names = 'shop' | 'cart' | 'inventory'

interface ReturnProps {
  setShopValue: (index: number, value: number) => void
  setInventoryValue: (index: number, value: number) => void
  setCartValue: (index: number, value: number) => void
}
export const withInput = (compName: Names, WrapperComponent: React.ComponentClass<any>) => {
  return connect(null, mapDispatchToProps)(class Comp extends React.Component<ReturnProps> {
    handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if(parseInt(event.target.value, 10) >= 1) {
        if(compName === 'shop') {
          this.props.setShopValue(parseInt(event.target.value, 10), index)
        }
        if(compName === 'cart') {
          this.props.setCartValue(index, parseInt(event.target.value, 10))
        }
        if(compName === 'inventory') {
          this.props.setInventoryValue(index, parseInt(event.target.value, 10))
        }
      }
    }
    render() {
      return (
        <WrapperComponent handleChange={this.handleChange} {...this.props} />
      )
    }
  })
}
