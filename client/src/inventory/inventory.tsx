import React, { Component } from 'react'

import {
  Header, Footer, Dispatch, Stonk, State, Stonks,
  selectAllInventory, unSelectAllInventory, selectStonkInInventory  , withInput, withSnack
} from '../exports'
import {
  Theme, withStyles, WithStyles, createStyles, Paper, Table, TableBody, TableCell, TableRow, Checkbox, TextField, Button
} from '@material-ui/core'
import { connect } from 'react-redux'
import { Title } from '../cart/tableTitle'

const styles = (theme: Theme) => createStyles({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  selectEmpty: { marginTop: theme.spacing.unit * 2 },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '98%',
    marginTop: 75,
    marginLeft: '1%'
  },
  button: { marginTop: '1%' },
  table: { minWidth: 30 }
})
interface Props extends WithStyles<typeof styles> {
  handleChange: (amount: number) => (event: any) => void
  sellStonks: () => void
  inventory: Stonks
  selectStonkInInventory: (index: number) => void
  unSelectAllInventory: () => void
  selectAllInventory: () => void
}
/*@Type: Root Class Component
* @Usage: Used when at /inventory/ and shows users a table of stonks to sell or view
* @Props: {
*   sellStonks: calls function to sell all stonks;()
*   inventory: inventory to display(array)
*   selectStonkInInveotory/selectAllInventory/unSelectAllInventory: selection function;(index) / ()
* }
* @RenderPoint: Rendered when at /stonk/home by index.Provider.Router.Switch.Route(/home/)*/
export class InventoryComponent extends Component<Props> {
  render() {
    const { inventory, classes } = this.props
    return (
      <div>
        <Header currComp={'inventory'}/>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <Title selectAll={this.props.selectAllInventory} unSelectAll={this.props.unSelectAllInventory} />
              <TableBody>
               {inventory.map((stonk: Stonk) => {
                 return (
                   <TableRow key={stonk.id}>
                     <TableCell>
                       <Checkbox
                         checked={stonk.selected}
                         onChange={() => this.props.selectStonkInInventory(this.props.inventory.indexOf(stonk))}
                       />
                      </TableCell>
                      <TableCell component="th" scope="stonk">{stonk.name}</TableCell>
                      <TableCell>{stonk.description}</TableCell>
                      <TableCell>{stonk.amount}</TableCell>
                      <TableCell numeric={true}>${stonk.price}</TableCell>
                      <TableCell numeric={true}>
                      <TextField
                        type="number"
                        id="number"
                        value={stonk.sellAmount}
                        onChange={this.props.handleChange(inventory.indexOf(stonk))}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button className={classes.button} onClick={this.props.sellStonks} variant="contained" color="secondary">
          sell stonks
        </Button>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = (state: State) => ({
  inventory: state.inventory
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  sellStonks: () => dispatch({type: 'SELL_STONK_INVENTORY'}),
  selectAllInventory: () => dispatch(selectAllInventory()),
  unSelectAllInventory: () => dispatch(unSelectAllInventory()),
  selectStonkInInventory: (index: number) => dispatch(selectStonkInInventory(index))
})
const Inventory = connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(withInput('inventory', withSnack('inventory', InventoryComponent))))
// WARNING: must be default for unknown reasons
export default Inventory
