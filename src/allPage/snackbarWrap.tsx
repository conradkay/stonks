import * as React from 'react'
import {
  State, closeSnackbar, Dispatch, getClassSnackbarVariant, Variant
} from '../exports'

import { withStyles, WithStyles } from '@material-ui/core/styles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Snackbar from '@material-ui/core/Snackbar'

import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme: Theme) =>
  createStyles({
    success: { backgroundColor: '#43A047'},
    warning: {backgroundColor: '#FFA000'},
    error: {backgroundColor: theme.palette.error.dark},
    close: { width: theme.spacing.unit * 3, height: theme.spacing.unit * 3 },
    message: {display: 'flex', alignItems: 'center'},
    icon: {fontSize: 20, marginRight: theme.spacing.unit},
})

interface Props extends WithStyles<typeof styles> {
  message: string,
  open: boolean,
  closeSnackbar: () => void,
  variant: Variant
}
/*
* Takes in a message, and returns a success snackbar with the message.
* Also takes a variant from state containing which icon and background-color to use
*/

class SnackbarWrapComponent extends React.Component<Props> {
  render() {
    const variantIcon: {success: any; warning: any; error: any } = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon
    }

    const { classes, open, message, variant } = this.props

    const backgroundClass: string = getClassSnackbarVariant(variant, classes) // its my fault

    const Icon = variantIcon[variant]
    return (
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={open}
        autoHideDuration={2000}
        onClose={this.props.closeSnackbar}
      >
        <SnackbarContent
          className={backgroundClass}
          message={<span className={classes.message}>
            <Icon className={classes.icon} />
            <span style={{marginLeft: 15, marginTop: 5, fontSize: 14}}>{message}</span>

          </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              className={classes.icon}
              onClick={this.props.closeSnackbar}
            >
              <CloseIcon className={classes.close} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}
const mapStateToProps = (state: State): {open: boolean; message: string; variant: Variant} => {
  return {
    open: state.snackbar.open,
    message: state.snackbar.message,
    variant: state.snackbar.variant
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeSnackbar: () => dispatch(closeSnackbar())
})

export const SnackbarWrap = connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(SnackbarWrapComponent))
