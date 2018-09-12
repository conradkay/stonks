import React from 'react'
import { Provider } from 'react-redux'
import Inventory from './inventory/inventory'
import { Contact } from './contact/contact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer, defaultState, Home, Cart, Shop, SnackbarWrap } from './exports'
// let persistedState: State = defaultState
// if(localStorage.getItem('reduxState')) {
//   persistedState = JSON.parse(localStorage.getItem('reduxState') || '')
// }
const store = createStore(reducer, defaultState, composeWithDevTools())
// store.subscribe(() => {
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// })
const Wrapper = () => {
  return (
  <Provider store={store}>
    <div>
      <SnackbarWrap />
      <Router basename="/stonk">
        <Switch>
          <Route exact={true} path={'/'} render={() => <Home />}/>
          <Route path={'/cart/'} render={() => <Cart />}/>
          <Route path={'/contact/'} render={() => <Contact />}/>
          <Route path={'/shop/'} render={() => <Shop />}/>
          <Route path={'/inventory/'} render={() => <Inventory />}/>
        </Switch>
      </Router>
    </div>
  </Provider>
  )
}
export default Wrapper
