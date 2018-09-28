import React, { Component } from 'react'
import { Header, Footer, Dispatch, openSnackbar, Variant } from '../exports'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import createStyles from '@material-ui/core/styles/createStyles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField/TextField'
import Button from '@material-ui/core/Button/Button'
import Paper from '@material-ui/core/Paper/Paper'
/*@ContactComponent React Component
* @Type: React Class Component; Root
* @Usage: Used when at /contact/ and allows users to use a fake contact form
* @RenderPoint: Rendered when at /stonk/contact by index.Provider.Router.Switch.Route(/contact/)
* @Children&Utils: {
*   children = Title: Renders at top of table and provides info; (selectAllFunction, unSelectAllFunction)
* }
* @Methods: handleForm = changes value in state of stateString; (stateString = 'what input is being updated')
*/
const styles = (theme: Theme) => createStyles({
  input: { marginTop: '1%', marginRight: '1%', marginLeft: '1%', width: '95%' },
  button: { marginTop: '1%', marginBottom: '1%', marginRight: '1%', width: '95%' },
  root: { marginTop: 75 }
})
interface Props extends WithStyles<typeof styles> {
  openSnackbar: (message: string, variant: Variant) => void
}
interface TheState { name: string; message: string; feedback: string }

export class ContactComponent extends Component<Props, TheState> {
  state = { name: '', message: '', feedback: '' }
  constructor(props: Props) {
    super(props)
    this.handleForm = this.handleForm.bind(this)
  }
  componentDidMount() {
    this.props.openSnackbar('contact form loaded successfully', 'success')
  }
  handleForm = (stateString: 'name' | 'message' | 'feedback' ) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = {...this.state, [stateString]: event.target.value}
    this.setState(value)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Header currComp={'contact'}/>
        <Paper className={classes.root}>
          <form action="mailto:conradkay123@gmail.com" method="post" encType="text/plain">
            <TextField
              className={classes.input}
              onChange={this.handleForm('name')}
              value={this.state.name}
              placeholder="Enter name here"
              label="name"
              name="Hello, my name is"
            />
            <TextField
              className={classes.input}
              onChange={this.handleForm('message')}
              value={this.state.message}
              placeholder="put improvements here"
              label="improvements"
              name="Improvements"
            />
            <TextField
              className={classes.input}
              onChange={this.handleForm('feedback')}
              value={this.state.feedback}
              placeholder="put message here"
              label="message me!"
              name="message"
            />
            <Button variant="contained" type="submit" color="primary" className={classes.button}>Submit</Button>
          </form>
        </Paper>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openSnackbar: (message: string, variant: Variant) => dispatch(openSnackbar(message, variant))
})

export const Contact = connect(null, mapDispatchToProps)(withStyles(styles)(ContactComponent))
