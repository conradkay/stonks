import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Title } from './tableTitle'
import {
  State, Dispatch, Header, Footer,
  Stonk, selectStonkInCart, removeStonk, selectAllCart,
  unSelectAllCart, withInput, withSnack
} from '../exports'
import {
  TextField, Paper, Theme, TableBody, withStyles, WithStyles,
  createStyles, TableRow, TableCell, Checkbox, Button, Table
} from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
  selectEmpty: { marginTop: theme.spacing.unit * 2 },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '98%',
    marginTop: 90,
    marginLeft: '1%'
  },
  button: { marginTop: '1%' },
  table: { minWidth: 30 }
})

interface Props extends WithStyles<typeof styles> {
  handleChange: (value: number) => (event: any) => void
  buyStonks: () => void
  selectStonkInCart: (id: number) => void
  selectAllCart: () => void
  unSelectAllCart: () => void
  cart: Stonk[]
  buyStonkCartToInventory: () => void
}
/*@CartComponent React Component
* @Type: React Class Component; Root
* @Usage: Used when at /cart/ and allows users to buy stonks/view cart
* @Props: {
*   cart: Array of stonks to map through in Table
*   buyStonks: function to buy all selected stonks; ()
*   selectStonkInCart: selects/unselects whether to buy a stonk in cart; (id: number)
*   selectAllCart/unSelectAllCart: function to map through all stonks and make them selected/not selected; ()
* }
* @RenderPoint: Rendered when at /stonk/cart by index.Provider.Router.Switch.Route(/cart/)
* @Children&Utils: {
*   children = Title: Renders at top of table and provides info; (selectAllFunction, unSelectAllFunction)
* }
*/
export class CartComponent extends Component<Props> {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Header currComp={'cart'}/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <Title selectAll={this.props.selectAllCart} unSelectAll={this.props.unSelectAllCart} />
              <TableBody>
               {this.props.cart.map((stonk: Stonk) => {
                 return (
                   <TableRow key={stonk.id}>
                     <TableCell>
                       <Checkbox
                         checked={stonk.selected}
                         onChange={() => this.props.selectStonkInCart(this.props.cart.indexOf(stonk))}
                       />
                      </TableCell>
                      <TableCell component="th" scope="stonk">{stonk.name}</TableCell>
                      <TableCell>{stonk.description}</TableCell>
                      <TableCell>{stonk.amount ? stonk.amount: '...'}</TableCell>
                      <TableCell numeric={true}>${stonk.price}</TableCell>
                      <TableCell numeric={true}>
                      <TextField
                        type="number"
                        id="number"
                        value={stonk.amount}
                        onChange={this.props.handleChange(this.props.cart.indexOf(stonk))}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button className={classes.button} onClick={this.props.buyStonkCartToInventory} variant="contained" color="secondary">
          Buy stonks
        </Button>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
    cart: state.cart
  })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectStonkInCart: (id: number) => dispatch(selectStonkInCart(id)),
  removeStonk: (id: number) => dispatch(removeStonk(id)),
  selectAllCart: () => dispatch(selectAllCart()),
  unSelectAllCart: () => dispatch(unSelectAllCart()),
  buyStonkCartToInventory: () => dispatch({type: 'BUY_STONK_CART_TO_INVENTORY'})
})
export const Cart = connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(withInput('cart', withSnack('cart', CartComponent))))
