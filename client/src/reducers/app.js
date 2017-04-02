import Immutable from 'immutable';
import _ from 'lodash';
import {
    ADD_ITEM,
    DELETE_ITEM,
    ADD_LIST,
    DELETE_LIST,
    LOG_IN,
    RECEIVE_INFORMATION
} from '../actions/actions';


function getLastId(obj) {
    if (_.isEmpty(obj)) {
        return null;
    }
    let lastItem = obj.last();
    return lastItem.get('id');
}

function app(state = Immutable.Map({}), action) {
    switch(action.type) {
        case ADD_LIST:
            let new_list = Immutable.Map({
                id: state.get('userLists') ? getLastId(state.get('userLists')) + 1 : 1, 
                name: action.name
            });
            return state.set('userLists', state.get('userLists').push(new_list));
        case DELETE_LIST:
            let temp = state.withMutations(map => {
                map.set('userLists', state.get('userLists').filter(l => l.get('id') !== action.id))
                .set('listItems', state.get('listItems').filter(item => item.get('listId') !== action.id))
            });
            return temp.asImmutable();
        case ADD_ITEM:
            let new_item = Immutable.Map({
                    id: state.get('listItems') ? getLastId(state.get('listItems')) + 1 : 1,
                    item: action.item,
                    listId: action.listId
                });
            return state.set('listItems', state.get('listItems').push(new_item));
        case DELETE_ITEM:
            return state.set('listItems', state.get('listItems').filter(item => item.get('id') !== action.id))
        case LOG_IN:
            return state.set('isUpdating', true);
        case RECEIVE_INFORMATION:
            let curr_info = Immutable.fromJS(action.information),
                new_state = state.mergeDeep(curr_info);
            return new_state.set('isUpdating', false);
        default:
            return state;
    }
}

export default app;
