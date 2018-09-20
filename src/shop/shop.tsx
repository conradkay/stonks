import React, { Component } from 'react'
import {
  Header, Footer, Dispatch, addToCart, Variant, Stonk, stonks, State, withInput, withSnack
} from '../exports'
import {
  createStyles, withStyles, WithStyles, Theme, Button, Card, CardActionArea,
  CardMedia, Typography, CardContent, CardActions, Grid, TextField
} from '@material-ui/core'
import { connect } from 'react-redux'
const styles = (theme: Theme) => createStyles({
  photo: { height: 140 },
  button: { marginTop: '1%', width: '100%' },
  root: { flexGrow: 1 },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: 75,
    minHeight: '40%'
  },
  textField: { width: '100%' }
})

interface Props extends WithStyles<typeof styles> {
  handleChange: (index: number) => (event: any) => void
  openSnackbar: (message: string, variant: Variant) => void
  addToCart: (stonk: Stonk, amount: number) => void
  state: State
  setValue: (index: number, amount: number) => void
}
/*@Type: Root Class Component
* @Usage: Used when at /shop/ and shows users a list of cards allowing users to add to cart
* @Props: {
*   addToCart: calls function to add stonk to cart: (stonk, amount)
* }
* @RenderPoint: Rendered when at /stonk/home by index.Provider.Router.Switch.Route(/home/)
* @Comments: Uses tabs */
export class ShopComponent extends Component<Props, {value: number}> {
  constructor(props: Props) {
    super(props)
  }
  state = {
    value: 1
  }
  render() {
    const { classes, state, handleChange } = this.props
    return (
      <div className={classes.root}>
        <Header currComp="shop" />
        <Grid container={true} spacing={8} alignItems={'center'}>
          {stonks.map((stonk: Stonk) => {
            return (
              <Grid key={stonk.id} item={true} xs={3}> {/* item, not parent */}
                <Card className={classes.paper}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.photo}
                      title={stonk.name}
                      image={stonk.pathToImage}
                    />
                    <CardContent>
                      <Typography gutterBottom={true} variant="headline" component="h2">{stonk.name}</Typography>
                      <Typography component="p">{stonk.description}</Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <TextField
                     value={state.amountStonksShop[stonks.indexOf(stonk)]}
                     onChange={handleChange(stonks.indexOf(stonk))/*WARNING: dont use () =>*/}
                     type="number"
                     className={classes.textField}
                    />
                    <Button
                      onClick={() => this.props.addToCart(stonk, state.amountStonksShop[stonks.indexOf(stonk)])}
                      className={classes.button}
                      size="small"
                      color="primary"
                    >Add To Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = (state: State) => ({
  state: state
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToCart: (stonk: Stonk, amount: number) => dispatch(addToCart(stonk, amount))
})

export const Shop = connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(withInput('shop', withSnack('shop', ShopComponent))))
