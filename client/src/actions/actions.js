// { type: 'FETCH_ITEMS_REQUEST' }
// { type: 'FETCH_ITEMS_FAILURE', error: 'Oops' }
// { type: 'FETCH_ITEMS_SUCCESS', response: { } }

// export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const LOG_IN = 'LOG_IN';
//
// function requestItems(listId) {
//   return {
//     type: REQUEST_ITEMS,
//     listId
//   }
// }
//
// export const SELECT_LIST = 'SELECT_LIST'
//
// export function selectList(listId) {
//   return {
//     type: SELECT_LIST,
//     listId
//   }
// }
//
// export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
//
// function receiveItems(listId, json) {
//   return {
//     type: RECEIVE_ITEMS,
//     listId,
//     items: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

export function logIn(user) {
    return {
        type: LOG_IN,
        user
    }
}

export function addItem(item, listId) {
    return {
        type: ADD_ITEM,
        item,
        listId
    }
}

export function deleteItem(id) {
    return {
        type: DELETE_ITEM,
        id
    }
}

export function addList(name) {
    return {
        type: ADD_LIST,
        name
    }
}

export function removeList(id) {
    return {
        type: DELETE_LIST,
        id
    }
}

export function setCurrentListId(id) {
    return {
        type: 'setCurrentListId',
        id
    }
}
