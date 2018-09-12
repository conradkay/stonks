import * as React from 'react'
import {  } from '../exports'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      fontSize: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    link: {
      color: 'white', fontSize: 20,
      textDecoration: 'none', flexGrow: 1, margin: theme.spacing.unit
    }
})

class FooterComp extends React.Component <WithStyles<typeof styles>> {
  render() {
    return (
      <h3 />
    )
  }
}
export const Footer = withStyles(styles)(FooterComp)
