import React, { Component } from 'react'
import {
  Header, Footer, Dispatch, Variant, Stonk, stonks, State, withInput, withSnack, generateNum
} from '../exports'
import {
  createStyles, withStyles, WithStyles, Theme, Button, Card, CardActionArea,
  CardMedia, Typography, CardContent, CardActions, Grid, TextField, AppBar, Tabs, Tab
} from '@material-ui/core'
import { connect } from 'react-redux'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis'
/// <reference path="../react-vis.d.ts" />
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
  postStonksToCart: (stonk: Stonk, amount: number) => void
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
export class ShopComponent extends Component<Props, {values: number[]}> {
  state = {
    values: generateNum(stonks.length, 0) // default to info page, not graph
  }
  constructor(props: Props) {
    super(props)
  }
  handleChange = (index: number) =>  (event: React.ChangeEvent, value: number) => {
    this.setState({values: [...this.state.values.slice(0, index), value, ...this.state.values.slice(index + 1)]})
  }
  render() {
    const { classes, state, handleChange } = this.props
    return (
      <div className={classes.root}>
        <Header currComp="shop" />
        <Grid container={true} spacing={8} alignItems={'center'}>
          {stonks.map((stonk: Stonk, i: number) => {
            const dataArr = stonk.prices.map((obj: {date: string; price: number}, index: number) => {
              return {
                x: obj.date,
                y: obj.price
              }
            })
            return (
              <Grid key={stonk.id} item={true} xs={3}> {/* item, not parent */}
                <Card className={classes.paper}>
                  <AppBar position="static">
                    <Tabs fullWidth={true} value={this.state.values[i]} onChange={this.handleChange(i)}>
                      <Tab label="Stonk Info" />
                      <Tab label="Graph" />
                    </Tabs>
                  </AppBar>
                  {this.state.values[i] === 0 && <CardActionArea>
                    <CardMedia
                      className={classes.photo}
                      title={stonk.name}
                      image={stonk.pathToImage}
                    />
                    <CardContent>
                      <Typography gutterBottom={true} variant="headline" component="h2">{stonk.name}</Typography>
                      <Typography component="p">{stonk.description}</Typography>
                    </CardContent>
                  </CardActionArea>}
                  {this.state.values[i] === 1 && <XYPlot
                    xType="ordinal"
                    width={440}
                    height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Time ago" />
                    <YAxis title="Cost(in stonkerdonks)" />
                    <LineSeries
                      data={dataArr}
                      style={{stroke: 'violet', strokeWidth: 3}}
                    />
                  </XYPlot>}
                  <CardActions>
                    <TextField
                     value={state.amountStonksShop[stonks.indexOf(stonk)]}
                     onChange={handleChange(stonks.indexOf(stonk))/*WARNING: dont use () =>*/}
                     type="number"
                     className={classes.textField}
                    />
                    <Button
                      onClick={() => this.props.postStonksToCart(stonk, state.amountStonksShop[stonks.indexOf(stonk)])}
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
  postStonksToCart: (stonk: Stonk, amount: number) => dispatch({type: 'POST_STONK_TO_CART', stonk, amount})
})

export const Shop = connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(withInput('shop', withSnack('shop', ShopComponent))))
