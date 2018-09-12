import * as React from 'react';
import { closeSnackbar, getClassSnackbarVariant } from '../exports';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
const styles = (theme) => createStyles({
    success: { backgroundColor: '#43A047' },
    warning: { backgroundColor: '#FFA000' },
    error: { backgroundColor: theme.palette.error.dark },
    close: { width: theme.spacing.unit * 3, height: theme.spacing.unit * 3 },
    message: { display: 'flex', alignItems: 'center' },
    icon: { fontSize: 20, marginRight: theme.spacing.unit },
});
class SnackbarWrapComponent extends React.Component {
    render() {
        const variantIcon = {
            success: CheckCircleIcon,
            warning: WarningIcon,
            error: ErrorIcon
        };
        const { classes, open, message, variant } = this.props;
        const backgroundClass = getClassSnackbarVariant(variant, classes);
        const Icon = variantIcon[variant];
        return (React.createElement(Snackbar, { anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, open: open, autoHideDuration: 2000, onClose: this.props.closeSnackbar },
            React.createElement(SnackbarContent, { className: backgroundClass, message: React.createElement("span", { className: classes.message },
                    React.createElement(Icon, { className: classes.icon }),
                    React.createElement("span", { style: { marginLeft: 15, marginTop: 5, fontSize: 14 } }, message)), action: [
                    React.createElement(IconButton, { key: "close", color: "inherit", className: classes.icon, onClick: this.props.closeSnackbar },
                        React.createElement(CloseIcon, { className: classes.close }))
                ] })));
    }
}
const mapStateToProps = (state) => {
    return {
        open: state.snackbar.open,
        message: state.snackbar.message,
        variant: state.snackbar.variant
    };
};
const mapDispatchToProps = (dispatch) => ({
    closeSnackbar: () => dispatch(closeSnackbar())
});
export const SnackbarWrap = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SnackbarWrapComponent));
//# sourceMappingURL=snackbarWrap.js.map