import * as React from 'react'
import { State, getStylesHeader } from '../exports'
import { AppBar, withStyles, WithStyles, Toolbar, createStyles, Badge, Tooltip } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = () => createStyles({
  root: { flexGrow: 1, fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  link: { color: 'white', fontSize: 20, textDecoration: 'none', flexGrow: 1, fontWeight: 400 },
  badge: { top: 1, right: -15, fontSize: 16, color: '#76FF03' },
  tooltip: { fontSize: 16 }
})
interface Props extends WithStyles<typeof styles> {
  items: number; money: number; currComp: 'home' | 'shop' | 'contact' | 'inventory' | 'cart' | 'stonk'
}
/*@Usage: Rendered at top of every point in app as a fixed navigation point
* @Props: {
*   items: number of items in cart; mapStateToProps
*   money: current users money; mapStateToProps
*   currComp: string value passed in by renderPoint, used to show which component user is currently on
* }*/
class HeaderComp extends React.Component<Props> {
  render() {
    const { classes, items, currComp } = this.props
    return (
      <div className={classes.root}>
        <AppBar color="primary">
          <Toolbar disableGutters={true}>
            <Link
              style={getStylesHeader(currComp === 'home')}
              className={classes.link} to={'/'}>Home</Link>
            <Link
              style={getStylesHeader(currComp === 'shop')}
              className={classes.link} to={'/shop'}>Shop</Link>
            <Link
              style={getStylesHeader(currComp === 'contact')}
              className={classes.link} to={'/contact'}>Contact</Link>
            <Link
              style={getStylesHeader(currComp === 'inventory')}
              className={classes.link} to={'/inventory'}>Inventory</Link>

            <Link className={classes.link} to={'/cart'}>
              <Tooltip classes={{tooltip: classes.tooltip}} title={`cart, items: ${items}`}>
                <Badge badgeContent={items} color="primary" classes={{ badge: classes.badge }}>
                  <ShoppingCartIcon style={currComp === 'cart' ? {borderBottom: '1px solid white'}: {}}/>
                </Badge>
              </Tooltip>
            </Link>
            <h2 className={classes.link}>${this.props.money}</h2>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
const mapStateToProps = (state: State) => ({ items: state.cart.length, money: state.money })
export const Header = connect(mapStateToProps)(withStyles(styles)(HeaderComp))
