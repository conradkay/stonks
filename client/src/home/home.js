import React, { Component } from 'react';
import { Header, Footer, openSnackbar } from '../exports';
import { withStyles, createStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
const styles = (theme) => createStyles({
    root: {
        marginTop: '5%'
    }
});
class HomeComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: ''
        };
    }
    componentDidMount() {
        this.props.openSnackbar('homepage loaded successfully', 'success');
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(Header, { currComp: 'home' }),
            React.createElement("div", { className: classes.root },
                React.createElement(Typography, { style: { fontSize: 24 } }, "Hello, and welcome to the world of stonks. The stonk universe is an alternate reality set in a world where the Soviet Union never collapsed. Engladesh(the name of the new Soviet Union) later took  control of most of asia and is in a war against the United Capitalist Scum(UCS) Comprised of the USA, Scandinavia, Australia, and Uruguay pot bois(UPB). The Soviet Union(renamed Englandesh to make them think we are english capitalist men but in asia), was taken control by a me, so I made a system where we distrubuted STONKS(S-uper, C-ool, K-ids, W-ho, D-o, M-emes) was designed to be a new HIP, COOL, and FLOOPIN way of rationing the \"DO NOT EAT\" packets you find in beef jerky, stonks, of course, control a part of the economy in a certain aspect, for example, the cheese stonk regulates .001% of the cheese production and exportation. Some stonks are awarded to regular citizens that do good work for communism, (or sabotaging capitalists), also, BAMBOOZLIN anyone leads for massive stonks, which is why you will be bamboozlined if you aren't carefull, by the way, YOU will not be receiving goverment stonks because we see your browsing history.")),
            React.createElement(Footer, null)));
    }
}
const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (message, variant) => dispatch(openSnackbar(message, variant))
});
export const Home = connect(null, mapDispatchToProps)(withStyles(styles)(HomeComponent));
//# sourceMappingURL=home.js.map