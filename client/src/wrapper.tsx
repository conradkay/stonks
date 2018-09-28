import React from 'react'
import { Provider } from 'react-redux'
import Inventory from './inventory/inventory'
import { Contact } from './contact/contact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer, defaultState, Home, Cart, Shop, SnackbarWrap } from './exports'
import thunk from 'redux-thunk'
export const store = createStore(reducer, defaultState, composeWithDevTools(applyMiddleware(thunk)))

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