// { type: 'FETCH_ITEMS_REQUEST' }
// { type: 'FETCH_ITEMS_FAILURE', error: 'Oops' }
// { type: 'FETCH_ITEMS_SUCCESS', response: { } }

// export const REQUEST_ITEMS = 'REQUEST_ITEMS'
//
// function requestItems(listID) {
//   return {
//     type: REQUEST_ITEMS,
//     listID
//   }
// }
//
// export const SELECT_LIST = 'SELECT_LIST'
//
// export function selectList(listID) {
//   return {
//     type: SELECT_LIST,
//     listID
//   }
// }
//
// export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
//
// function receiveItems(listID, json) {
//   return {
//     type: RECEIVE_ITEMS,
//     listID,
//     items: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

export function addItem(item) {
    return {
        type: 'addItem',
        item
    }
}

export function deleteItem(index) {
    return {
        type: 'deleteItem',
        index
    }
}

export function addList(name) {
    return {
        type: 'addList',
        name
    }
}

export function removeList(index) {
    return {
        type: 'removeList',
        index
    }
}
