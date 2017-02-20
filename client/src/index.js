import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import store from './store';

import App from './containers/App';
import Home from './components/Home';
import GiftListHandler from './containers/GiftListHandler';
import UserListsHandler from './containers/UserListsHandler';
import './styles/index.css';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
            	<IndexRoute component={Home} />
            	<Route path='lists' component={UserListsHandler} />
            	<Route path='lists/:listId' component={GiftListHandler} />
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);
