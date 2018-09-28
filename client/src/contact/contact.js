import React, { Component } from 'react';
import { Header, Footer, openSnackbar } from '../exports';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Paper from '@material-ui/core/Paper/Paper';
const styles = (theme) => createStyles({
    input: {
        marginTop: '1%',
        marginRight: '1%',
        marginLeft: '1%',
        width: '95%'
    },
    button: {
        marginTop: '1%',
        marginBottom: '1%',
        marginRight: '1%',
        width: '95%'
    },
    root: {
        marginTop: '6%'
    }
});
export class ContactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            feedback: ''
        };
        this.handleForm = (stateString) => (event) => {
            const value = Object.assign({}, this.state, { [stateString]: event.target.value });
            this.setState(value);
        };
        this.handleForm = this.handleForm.bind(this);
    }
    componentDidMount() {
        this.props.openSnackbar('contact form loaded successfully', 'success');
    }
    render() {
        const { classes } = this.props;
        return (React.createElement("div", null,
            React.createElement(Header, { currComp: 'contact' }),
            React.createElement(Paper, { className: classes.root },
                React.createElement(TextField, { className: classes.input, onChange: this.handleForm('name'), value: this.state.name, placeholder: "Ghandini's butterboy", label: "name" }),
                React.createElement(TextField, { className: classes.input, onChange: this.handleForm('message'), value: this.state.message, placeholder: "Ghandini's butterboy", label: "message" }),
                React.createElement(TextField, { className: classes.input, onChange: this.handleForm('feedback'), value: this.state.feedback, placeholder: "Ghandini's butterboy", label: "feedback" }),
                React.createElement(Button, { variant: "contained", color: "primary", className: classes.button }, "Submit")),
            React.createElement(Footer, null)));
    }
}
const mapDispatchToProps = (dispatch) => ({
    openSnackbar: (message, variant) => dispatch(openSnackbar(message, variant))
});
export const Contact = connect(null, mapDispatchToProps)(withStyles(styles)(ContactComponent));
//# sourceMappingURL=contact.js.map