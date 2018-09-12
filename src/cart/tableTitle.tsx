import React, { Component } from 'react'
import {TableCell, TableRow, Checkbox, TableHead} from '@material-ui/core'

interface TitleProps {
  selectAll: () => void,
  unSelectAll: () => void
}
interface TitleState {
  checked: boolean
}
export class Title extends Component<TitleProps, TitleState> {
  state = {
    checked: false
  }
  onCheck(state: TitleState) {
    if(state.checked) {
      this.setState({checked: false})
      this.props.unSelectAll()
    }
    else {
      this.setState({checked: true})
      this.props.selectAll()
    }
  }
  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox checked={this.state.checked} onChange={() => this.onCheck(this.state)}/>
          </TableCell>
          <TableCell>
            name
          </TableCell>
          <TableCell>description</TableCell>
          <TableCell>Current Amount</TableCell>
          <TableCell>price</TableCell>
          <TableCell>amount</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}
