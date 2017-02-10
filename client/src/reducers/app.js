// import Immutable from 'immutable';
import _ from 'lodash';

const initialState = {
  userLists: [{id: 1, name: 'test'}],
  listItems: [{id: 1, item: 'my Item', listId: 1}],
  activeList: 0
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
        case 'addList':
            return {
                ...state,
                userLists: [...state.userLists,
                    {
                        id: getLastId(state.userLists) ? getLastId(state.userLists) + 1 : 1,
                        name: action.name
                    }
                ]
            }
        case 'removeList':
            return {
                ...state,
                userLists: _.filter(state.userLists, (lists, index) => lists.id !== action.id),
                listItems: _.filter(state.listItems, (item, index) => item.listId !== action.id)
            };
        case 'addItem':
            return {
                ...state,
                listItems: [...state.listItems, {
                    id: getLastId(state.listItems) ? getLastId(state.listItems) + 1 : 1,
                    item: action.item,
                    listId: action.listId

                }]
            };
        case 'deleteItem':
            return {
                ...state,
                listItems: _.filter(state.listItems, (item, index) => item.id !== action.id)
            };
        case 'setCurrentListId':
            return {
                ...state,
                activeList: action.id
            }
        default:
            return state;
    }
}

export default app;
