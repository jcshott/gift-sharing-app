import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import app from './reducers/app';

const store = createStore(app, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
));

export default store;