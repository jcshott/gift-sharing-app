/* eslint-disable */
import Immutable from 'immutable';

import {
    ERROR,
    LOGGING_IN,
    RECEIVE_INFORMATION,
    REQUESTING_INFORMATION,
    UPDATE_ITEMS
} from '../actions/actions';

function app(state = Immutable.Map({}), action) {
    switch(action.type) {
        case LOGGING_IN:
            return state.set('isUpdating', true);
        case REQUESTING_INFORMATION:
            return state.set('isUpdating', false);
        case RECEIVE_INFORMATION:
            let new_info = Immutable.fromJS(action.information),
                new_state = state.mergeDeep(new_info);
            return new_state.set('isUpdating', false);
        case UPDATE_ITEMS:
            let listItems = Immutable.fromJS(action.information),
                new_item_state = state.set('listItems', listItems.get('listItems'));
            return new_item_state.set('isUpdating', false);
        case ERROR:
            return state.merge(Immutable.Map({'isUpdating': false, 'error': action.error}));
        default:
            return state;
    }
}

export default app;
