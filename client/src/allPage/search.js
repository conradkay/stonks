import React, { Component } from 'react';
import { connect } from 'react-redux';
export class SearchComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: ''
        };
        this._handleKeyPress = (e) => {
            if (e.key === 'Enter' && this.state.value) {
                this.handleClick();
            }
        };
        this.handleClick = () => null;
        this.handleChange = (event) => this.setState({ value: event.target.value });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("input", { className: "nameInput", autoFocus: true, placeholder: "search for stonks", onKeyPress: this._handleKeyPress, value: this.state.value, onChange: this.handleChange })));
    }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
//# sourceMappingURL=search.js.map