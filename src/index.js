import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Contact } from './contact/contact';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { Home, Cart, Shop, defaultState, reducer, Inventory } from './exports';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
const store = createStore(reducer, defaultState, composeWithDevTools());
const Wrapper = () => {
    return (React.createElement(Provider, { store: store },
        React.createElement(Router, { basename: "/stonk" },
            React.createElement(Switch, null,
                React.createElement(Route, { exact: true, path: '/', render: () => React.createElement(Home, null) }),
                React.createElement(Route, { path: '/cart/', render: () => React.createElement(Cart, null) }),
                React.createElement(Route, { path: '/contact/', render: () => React.createElement(Contact, null) }),
                React.createElement(Route, { path: '/shop/', render: () => React.createElement(Shop, null) }),
                React.createElement(Route, { path: '/inventory/', render: () => React.createElement(Inventory, null) })))));
};
render(React.createElement(Wrapper, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map