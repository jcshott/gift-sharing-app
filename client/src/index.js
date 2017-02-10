import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';

import store from './store';
import App from './containers/App';
import VisibleGiftList from './containers/VisibleGiftList';
import './styles/index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <Route path='lists/:id' component={VisibleGiftList}/>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);
