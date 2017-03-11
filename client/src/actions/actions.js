import fetch from 'isomorphic-fetch';
import _ from 'lodash';

export const REQUEST_INFORMATION = 'REQUEST_INFORMATION';
export const RECEIVE_INFORMATION = 'RECEIVE_INFORMATION';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const LOG_IN = 'LOG_IN';

export function signIn(formInfo) {
    if (!_.isEmpty(formInfo)) {
        return dispatch => {
            dispatch(logIn());
            return fetch(`/login`, {
                method: 'post',
                body: JSON.stringify(formInfo),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "same-origin"
            })
                .then(response => response.json())
                .then(json => dispatch(receiveInformation(json)));
        }
    }
}

// export function fetchInformation() {
//         return dispatch => {
//             dispatch(logIn())
//             return fetch(`/userInfo`)
//                 .then(response => response.json())
//                 .then(json => dispatch(receiveInformation(json)))
//         }
// }

function receiveInformation(json) {
  return {
    type: RECEIVE_INFORMATION,
    information: json,
  }
}

function logIn() {
    return {
        type: LOG_IN,
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
