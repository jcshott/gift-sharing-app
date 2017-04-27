import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import {
    ERROR_CODES,
} from '../constants/errors';

export const REQUESTING_INFORMATION = 'REQUESTING_INFORMATION';
export const RECEIVE_INFORMATION = 'RECEIVE_INFORMATION';
export const UPDATE_ITEMS = 'UPDATE_ITEMS';
export const LOGGING_IN = 'LOGGING_IN';
export const LOG_OUT = 'LOG_OUT';
export const ERROR = 'ERROR';


const LIST_URL = '/userLists';
const ITEMS_URL = '/listItems/<listId>';

////////// USER ACTIONS /////////////////

export function userFromToken(tokenFromStorage) {
    return dispatch => {
        return fetch(`/userInfoFromToken?token=${tokenFromStorage}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${tokenFromStorage}`
            }
        })
            .then(response => handleErrors(response))
            .then(response => response.json())
            .then(payload => dispatch(receiveInformation(payload)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function signIn(formInfo) {
    if (!_.isEmpty(formInfo)) {
        return dispatch => {
            dispatch(loggingIn());
            return fetch(`/login`, {
                method: 'post',
                body: JSON.stringify(formInfo),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "same-origin"
            })
                .then(response => handleErrors(response))
                .then(response => response.json())
                .then(payload => {
                    localStorage.setItem('jwtToken', payload.token);
                    dispatch(receiveInformation(payload))
                })
                .catch((err) => dispatch(errorReceived(err.message)));
        }
    }
}

export function signUp(formInfo) {
    if (!_.isEmpty(formInfo)) {
        return dispatch => {
            dispatch(loggingIn());
            return fetch(`/signup`, {
                method: 'post',
                body: JSON.stringify(formInfo),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "same-origin"
            })
                .then(response => handleErrors(response))
                .then(response => response.json())
                .then(payload => {
                    localStorage.setItem('jwtToken', payload.token);
                    dispatch(receiveInformation(payload))
                })
                .catch(err => dispatch(errorReceived(err.message)));
        }
    }
}

export function logOut() {
    return {
        type: LOG_OUT,
    }
}

function loggingIn() {
    return {
        type: LOGGING_IN,
    }
}

////////// LIST ACTIONS /////////////////

export function addList(listName, tokenFromStorage) {
    return dispatch => {
        dispatch(requestingInformation());
        return fetch(LIST_URL, {
            method: 'post',
            body: JSON.stringify({name: listName}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromStorage}`,
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(payload => dispatch(receiveInformation(payload)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function removeList(listId, tokenFromStorage) {
    return dispatch =>{
        dispatch(requestingInformation());
        return fetch(LIST_URL, {
            method: 'delete',
            body: JSON.stringify({listId: listId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromStorage}`
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(payload => dispatch(receiveInformation(payload)))
            .catch(err => dispatch(errorReceived(err)));
    }
}


export function fetchItems(listId) {
    return dispatch => {
        dispatch(requestingInformation());
        return fetch(ITEMS_URL.replace('<listId>',listId))
            .then(response => response.json())
            .then(payload => dispatch(updateItems(payload)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function addItem(itemInfo, listId) {
    return dispatch => {
        dispatch(requestingInformation());
        return fetch(ITEMS_URL.replace('<listId>',listId), {
            method: 'post',
            body: JSON.stringify(itemInfo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(payload => dispatch(updateItems(payload)))
            .catch((err) => dispatch(errorReceived(err)));
    }
}

export function removeItem(itemId, listId) {
    return dispatch =>{
        dispatch(requestingInformation());
        return fetch(ITEMS_URL.replace('<listId>',listId), {
            method: 'delete',
            body: JSON.stringify({itemId: itemId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(payload => dispatch(updateItems(payload)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

function updateItems(json) {
    return {
        type: UPDATE_ITEMS,
        information: json,
    }
}

////////// HELPER ACTIONS /////////////////

function receiveInformation(json) {
  return {
    type: RECEIVE_INFORMATION,
    information: json,
  }
}

function requestingInformation() {
    return {
        type: REQUESTING_INFORMATION
    }
}

function errorReceived(errorCode) {
    return {
        type: ERROR,
        information: ERROR_CODES[errorCode]
    }
}

/// fetch doesn't throw an error if it receives an error status code from server
//// see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response;
}
