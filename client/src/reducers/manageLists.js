import Immutable from 'immutable';

const initialState = {
  userLists: [],
  todos: []
}

function giftsterApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}

export default (state = Immutable.List(['All The Things!']), action) => {
    switch(action.type) {
        case 'addItem':
            return state.push(action.item);
        case 'deleteItem':
            return state.filter((todo, index) => index !== action.index);
        default:
            return state;
    }
}
