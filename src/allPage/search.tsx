import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch, State } from '../exports'
interface Props {

}
interface TheState {
  value: string
}

export class SearchComponent extends Component<Props, TheState> {
  state = {
    value: '' // store input elements value
  }
  // checks if key is enter and forms are filled, in which case, triggers addTodo
  _handleKeyPress = (e: any) => {
    if(e.key === 'Enter' && this.state.value) {
      this.handleClick()
    }
  }
  handleClick = () => null
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({value: event.target.value})
  render() {
    return (
      <div>
        <input
          className="nameInput"
          autoFocus={true}
          placeholder="search for stonks"
          onKeyPress={this._handleKeyPress}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
const mapStateToProps = (state: State) => ({

})
const mapDispatchToProps = (dispatch: Dispatch) => ({

})
export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
