// { type: 'FETCH_ITEMS_REQUEST' }
// { type: 'FETCH_ITEMS_FAILURE', error: 'Oops' }
// { type: 'FETCH_ITEMS_SUCCESS', response: { } }

// export const REQUEST_ITEMS = 'REQUEST_ITEMS'
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

export function addItem(item, listId) {
    return {
        type: 'addItem',
        item,
        listId
    }
}

export function deleteItem(id) {
    return {
        type: 'deleteItem',
        id
    }
}

export function addList(name) {
    return {
        type: 'addList',
        name
    }
}

export function removeList(id) {
    return {
        type: 'removeList',
        id
    }
}

export function setCurrentListId(id) {
    return {
        type: 'setCurrentListId',
        id
    }
}
