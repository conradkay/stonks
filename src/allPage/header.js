import * as React from 'react';
import { SnackbarWrap } from '../exports';
import { AppBar, withStyles, Toolbar, createStyles, Badge, Tooltip } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const styles = () => createStyles({
    root: {
        flexGrow: 1, fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    link: {
        color: 'white', fontSize: 20, textDecoration: 'none',
        flexGrow: 1, fontWeight: 400
    },
    badge: {
        top: 1,
        right: -15,
        fontSize: 16,
        color: '#76FF03'
    },
    tooltip: {
        fontSize: 16
    }
});
const mapStateToProps = (state) => ({
    items: state.cart.length,
    money: state.money
});
export const Header = connect(mapStateToProps)(withStyles(styles)(class HeaderComp extends React.Component {
    render() {
        const { classes, items, currComp } = this.props;
        return (React.createElement("div", { className: this.props.classes.root },
            React.createElement(AppBar, { color: "primary" },
                React.createElement(SnackbarWrap, null),
                " ",
                React.createElement(Toolbar, null,
                    React.createElement(Link, { style: currComp === 'home' ? { textDecoration: 'underline' } : {}, className: classes.link, to: '/' }, "Home"),
                    React.createElement(Link, { style: currComp === 'shop' ? { textDecoration: 'underline' } : {}, className: classes.link, to: '/shop' }, "Shop"),
                    React.createElement(Link, { style: currComp === 'contact' ? { textDecoration: 'underline' } : {}, className: classes.link, to: '/contact' }, "Contact"),
                    React.createElement(Link, { style: currComp === 'inventory' ? { textDecoration: 'underline' } : {}, className: classes.link, to: '/inventory' }, "Inventory"),
                    React.createElement(Link, { className: classes.link, to: '/cart' },
                        React.createElement(Tooltip, { classes: { tooltip: classes.tooltip }, title: `cart, items: ${items}` },
                            React.createElement(Badge, { badgeContent: items, color: "primary", classes: { badge: classes.badge } },
                                React.createElement(ShoppingCartIcon, { style: currComp === 'cart' ? { borderBottom: '1px solid white' } : {} })))),
                    React.createElement("h2", { className: classes.link },
                        "$",
                        this.props.money)))));
    }
}));
//# sourceMappingURL=header.js.map