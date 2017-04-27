const Promise = require('bluebird');

const options = {
    // Initialization Options
    promiseLib: Promise
};

const pgp = require('pg-promise')(options);
const db = pgp('postgres://coreyshott:gift@localhost:5432/gifting');

//// Query functions //////

function addUser(userInfo) {
    return new Promise(function(resolve, reject) {
        db.one("insert into users(username, password, first, last) values($1, $2, $3, $4) returning id, first, last," +
            " username", [
                userInfo.username,
                userInfo.password,
                userInfo.first,
                userInfo.last
            ])
            .then(newUser => {
                resolve(newUser);
            })
            .catch(error => {
                console.error('error inserting user: ', error);
                reject(error);
            });
    });
}

function getUserbyId(uid) {
    return new Promise(function(resolve, reject) {
        db.one("select * from users where id=$1", [uid])
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('error getting id: ', uid);
                reject(error);
            });
        }
    );
}

function getUserbyUsername(username) {
    return new Promise(function(resolve, reject) {
        db.oneOrNone("select * from users where username=$1", [username])
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.error('error getting id: ', uid);
                reject(error);
            });
        }
    );
}

function getUserLists(userId) {
    return new Promise((resolve, reject) => {
        db.any("SELECT * from lists WHERE user_id = $1", [userId])
            .then((data) => {
                resolve(data);
            })
            .catch(error => {
                console.error('error getting lists for id: ', userId);
                reject(error);
            });
    });
}

/*
*  Adds a new list with listName to database and returns all lists for that user.
*  returns List of all lists for that user
*
*/
function addList(listName, userId) {
    return new Promise(function(resolve, reject) {
        db.task(t =>  {
            return t.one("INSERT into lists(name, user_id) values($1, $2) returning user_id", [
                listName,
                userId
            ])
                .then(list => {
                    return t.any("SELECT * from lists WHERE user_id = $1", [list.user_id]);
                });
        })
            .then(userLists => {
                resolve(userLists);
            })
            .catch(error => {
                console.error('error inserting list: ', error);
                reject(error);
            });
    });
}

function removeList(listId){
    return new Promise((resolve, reject) => {
        db.task(t => {
            return t.none('DELETE from items where list_id = $1', [listId])
                .then(() => { return t.none('DELETE from lists where id = $1', [listId]);
            })
        })
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.error('error removing: ', error);
                reject(error);
            });
    })
}

function getListItems(listId){
    return new Promise((resolve, reject) => {
        db.any("SELECT * from items WHERE list_id = $1", listId)
            .then((data) => {
                resolve(data);
            })
            .catch(error => {
                console.error('error getting items for list_id: ', listId);
                reject(error);
            });
    });
}

function addItem(itemDescription, listId) {
    return new Promise(function(resolve, reject) {
        db.task(t =>  {
            return t.one("INSERT into items(description, list_id) values($1, $2) returning list_id", [
                itemDescription,
                listId
            ], event => event.list_id)
                .then(listId => {
                    return t.any("SELECT * from items WHERE list_id = $1", [listId]);
                });
        })
        .then(listItems => {
            resolve(listItems);
        })
        .catch(error => {
           console.error('error inserting: ', error);
            reject(error);
        });
    });
}

function removeItem(itemId){
    return new Promise(function(resolve, reject){
        db.none('DELETE from items where id = $1', itemId)
        .then(() => resolve())
        .catch(error => {
            console.error('error removing item: ', itemId);
            reject(error);
        });
    })
}



module.exports = {
    addUser: addUser,
    getUserbyId: getUserbyId,
    getUserbyUsername: getUserbyUsername,
    addList: addList,
    removeList: removeList,
    getUserLists: getUserLists,
    getListItems: getListItems,
    addItem: addItem,
    removeItem: removeItem,
};