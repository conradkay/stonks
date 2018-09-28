import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from './tableTitle';
import { Header, Footer, openSnackbar, selectStonkInCart, removeStonk, selectAllCart, unSelectAllCart, buyStonks, changeAmount } from '../exports';
import { TextField, Paper, TableBody, withStyles, createStyles, TableRow, TableCell, Checkbox, Button, Table } from '@material-ui/core';
const styles = (theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    selectEmpty: { marginTop: theme.spacing.unit * 2 },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '98%',
        marginTop: '5%',
        marginLeft: '1%'
    },
    button: { marginTop: '1%' },
    table: { minWidth: 30 }
});
export class CartComponent extends Component {
    constructor() {
        super(...arguments);
        this.handleChange = (index) => (event) => {
            if (event.target.value > 0) {
                this.props.changeStonkAmount(parseInt(event.target.value, 10), index);
            }
        };
    }
    componentDidMount() {
        this.props.openSnackbar('cart successfully opened', 'success');
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(Header, { currComp: 'cart' }),
            React.createElement(Paper, { className: classes.root },
                React.createElement(Table, { className: classes.table },
                    React.createElement(Title, { selectAll: this.props.selectAllCart, unSelectAll: this.props.unSelectAllCart }),
                    React.createElement(TableBody, null, this.props.cart.map((stonk) => {
                        return (React.createElement(TableRow, { key: stonk.id },
                            React.createElement(TableCell, null,
                                React.createElement(Checkbox, { checked: stonk.selected, onChange: () => this.props.selectStonkInCart(this.props.cart.indexOf(stonk)) })),
                            React.createElement(TableCell, { component: "th", scope: "stonk" }, stonk.name),
                            React.createElement(TableCell, null, stonk.description),
                            React.createElement(TableCell, null, stonk.amount ? stonk.amount : '...'),
                            React.createElement(TableCell, { numeric: true },
                                "$",
                                stonk.price),
                            React.createElement(TableCell, { numeric: true },
                                React.createElement(TextField, { type: "number", id: "number", value: stonk.amount, onChange: this.handleChange(this.props.cart.indexOf(stonk)) }))));
                    })))),
            React.createElement(Button, { className: classes.button, onClick: this.props.buyStonks, variant: "contained", color: "secondary" }, "Buy stonks"),
            React.createElement(Footer, null)));
    }
}
const mapStateToProps = (state) => ({
    cart: state.cart
});
const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (message, variant) => dispatch(openSnackbar(message, variant)),
    selectStonkInCart: (id) => dispatch(selectStonkInCart(id)),
    removeStonk: (id) => dispatch(removeStonk(id)),
    selectAllCart: () => dispatch(selectAllCart()),
    unSelectAllCart: () => dispatch(unSelectAllCart()),
    buyStonks: () => dispatch(buyStonks()),
    changeStonkAmount: (amount, index) => dispatch(changeAmount(amount, index))
});
export const Cart = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CartComponent));
//# sourceMappingURL=cart.js.map