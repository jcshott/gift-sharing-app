import Immutable from 'immutable';

const initialState = {
  userLists: Immutable.List(['My List']),
  listItems: Immutable.List(['All The Things!'])
}

function app(state = initialState, action) {
    switch(action.type) {
        case 'addItem':
            return {
                ...state,
                listItems: state.listItems.push(action.item)
            };
        case 'deleteItem':
            return {
                ...state,
                listItems: state.listItems.filter((items, index) => index !== action.index)
            };
        case 'addList':
            return {
                ...state,
                userLists: state.userLists.push(action.name)
            };
        case 'removeList':
            return {
                ...state,
                userLists: state.userLists.filter((items, index) => index !== action.index)
            };
        default:
            return state;
    }
}

export default app;
