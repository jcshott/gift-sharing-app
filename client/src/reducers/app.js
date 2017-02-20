// import Immutable from 'immutable';
import _ from 'lodash';
import {
    ADD_ITEM,
    DELETE_ITEM,
    ADD_LIST,
    DELETE_LIST,
    LOG_IN
} from '../actions/actions';

const initialState = {
    currentUser: {},
    userLists: [{id: 1, name: 'test'}],
    listItems: [{id: 1, item: 'my Item', listId: 1}]
}

function getLastId(obj) {
    if (_.isEmpty(obj)) {
        return null;
    }
    let lastItem = _.last(_.sortBy(obj, ['id']));
    return lastItem.id;
}

function app(state = initialState, action) {
    switch(action.type) {
        case ADD_LIST:
            return {
                ...state,
                userLists: [...state.userLists,
                    {
                        id: getLastId(state.userLists) ? getLastId(state.userLists) + 1 : 1,
                        name: action.name
                    }
                ]
            }
        case DELETE_LIST:
            return {
                ...state,
                userLists: _.filter(state.userLists, (lists, index) => lists.id !== action.id),
                listItems: _.filter(state.listItems, (item, index) => item.listId !== action.id)
            };
        case ADD_ITEM:
            return {
                ...state,
                listItems: [...state.listItems, {
                    id: getLastId(state.listItems) ? getLastId(state.listItems) + 1 : 1,
                    item: action.item,
                    listId: action.listId

                }]
            };
        case DELETE_ITEM:
            return {
                ...state,
                listItems: _.filter(state.listItems, (item, index) => item.id !== action.id)
            };
        case LOG_IN:
            return {
                ...state,
                currentUser: {
                    username: action.user.username,
                    password: action.user.password
                }
            }
        default:
            return state;
    }
}

export default app;
