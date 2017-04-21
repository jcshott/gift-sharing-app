import fetch from 'isomorphic-fetch';
import _ from 'lodash';

export const REQUESTING_INFORMATION = 'REQUESTING_INFORMATION';
export const RECEIVE_INFORMATION = 'RECEIVE_INFORMATION';
export const UPDATE_ITEMS = 'UPDATE_ITEMS';
export const LOGGING_IN = 'LOGGING_IN';
export const ERROR = 'ERROR';


const LIST_URL = '/userLists';
const ITEMS_URL = '/listItems/<listId>';

////////// USER ACTIONS /////////////////

export function signIn(formInfo) {
    if (!_.isEmpty(formInfo)) {
        return dispatch => {
            dispatch(loggingIn());
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
                .then(json => dispatch(receiveInformation(json)))
                .catch(err => dispatch(errorReceived(err)));
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
                .then(response => response.json())
                .then(json => dispatch(receiveInformation(json)))
                .catch(err => dispatch(errorReceived(err)));
        }
    }
}


function loggingIn() {
    return {
        type: LOGGING_IN,
    }
}

////////// LIST ACTIONS /////////////////

export function addList(listInfo) {
    return dispatch => {
        dispatch(requestingInformation());
        return fetch(LIST_URL, {
            method: 'post',
            body: JSON.stringify(listInfo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(json => dispatch(receiveInformation(json)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function removeList(listInfo) {
    return dispatch =>{
        dispatch(requestingInformation());
        return fetch(LIST_URL, {
            method: 'delete',
            body: JSON.stringify(listInfo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(json => dispatch(receiveInformation(json)))
            .catch(err => dispatch(errorReceived(err)));
    }
}


export function fetchItems(listId) {
    return dispatch => {
        dispatch(requestingInformation());
        return fetch(ITEMS_URL.replace('<listId>',listId))
            .then(response => response.json())
            .then(json => dispatch(updateItems(json)))
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
            .then(json => dispatch(updateItems(json)))
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function removeItem(itemId) {
    return dispatch =>{
        dispatch(requestingInformation());
        return fetch(ITEMS_URL, {
            method: 'delete',
            body: JSON.stringify({itemId: itemId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin"
        })
            .then(response => response.json())
            .then(json => dispatch(updateItems(json)))
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

function errorReceived(error) {
    return {
        type: ERROR,
        information: error
    }
}

