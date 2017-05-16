/* eslint-disable */
import Immutable from 'immutable';

import {
    ERROR,
    CLEAR_ERROR,
    LOGGING_IN,
    LOG_OUT,
    RECEIVE_INFORMATION,
    REQUESTING_INFORMATION,
    UPDATE_ITEMS
} from '../actions/actions';

function app(state = Immutable.Map({}), action) {
    switch(action.type) {
        case LOGGING_IN:
            return state.set('isUpdating', true);
        case REQUESTING_INFORMATION:
            return state.set('isUpdating', true);
        case RECEIVE_INFORMATION:
            let newInfo = Immutable.fromJS(action.information);
                return state.merge(newInfo).set('isUpdating', false).set('error', null);
        case UPDATE_ITEMS:
            let listItems = Immutable.fromJS(action.information);
            return state.set('listItems', listItems.get('listItems')).set('isUpdating', false);
        case ERROR:
            return state.merge(Immutable.Map({'isUpdating': false, 'error': action.information}));
        case CLEAR_ERROR:
            return state.set('error', null);
        case LOG_OUT:
            return state.clear();
        default:
            return state;
    }
}

export default app;
