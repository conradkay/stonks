import React, { Component } from 'react';
import { Header, Footer, addToCart, setShopValue, openSnackbar, stonks } from '../exports';
import { createStyles, withStyles, Button, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
const styles = (theme) => createStyles({
    photo: { height: 140 },
    button: { marginTop: '1%', width: '100%' },
    root: { flexGrow: 1 },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '20%',
        minHeight: '40%'
    },
    textField: { width: '100%' }
});
export class ShopComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (index) => (event) => {
            if (parseInt(event.target.value, 10) >= 1) {
                this.props.setValue(index, parseInt(event.target.value, 10));
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.openSnackbar('shop loaded successfully', 'success');
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", { className: classes.root },
            React.createElement(Header, { currComp: "shop" }),
            React.createElement(Grid, { container: true, spacing: 8, alignItems: 'center' }, stonks.map((stonk) => {
                return (React.createElement(Grid, { key: stonk.id, item: true, xs: 3 },
                    React.createElement(Card, { className: classes.paper },
                        React.createElement(CardActionArea, null,
                            React.createElement(CardMedia, { className: classes.photo, title: stonk.name, image: stonk.pathToImage }),
                            React.createElement(CardContent, null,
                                React.createElement(Typography, { gutterBottom: true, variant: "headline", component: "h2" }, stonk.name),
                                React.createElement(Typography, { component: "p" }, stonk.description))),
                        React.createElement(CardActions, null,
                            React.createElement(TextField, { value: this.props.state.amountStonksShop[stonks.indexOf(stonk)], onChange: this.handleChange(stonks.indexOf(stonk)), type: "number", className: classes.textField }),
                            React.createElement(Button, { onClick: () => this.props.addToCart(stonk, this.props.state.amountStonksShop[stonks.indexOf(stonk)]), className: classes.button, size: "small", color: "primary" }, "Add To Cart")))));
            })),
            React.createElement(Footer, null)));
    }
}
const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    setValue: (index, amount) => dispatch(setShopValue(index, amount)),
    addToCart: (stonk, amount) => dispatch(addToCart(stonk, amount)),
    openSnackbar: (message, variant) => dispatch(openSnackbar(message, variant))
});
export const Shop = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopComponent));
//# sourceMappingURL=shop.js.map