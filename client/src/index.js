import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';

import configureStore from './store';
import App from './containers/App';
import ListHandler from './containers/ListHandler';
import './styles/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App} />
            <Route path='list/:listId' component={ListHandler}/>
        </Router>
    </Provider>,
  document.getElementById('root')
);
