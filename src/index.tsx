import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { Contact } from './contact/contact'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import Inventory from './inventory/inventory'
import { Home, Cart, Shop, defaultState, reducer, SnackbarWrap } from './exports'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'

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
render(
  <Wrapper />,
  document.getElementById('root')
)
