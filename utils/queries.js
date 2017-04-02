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
        db.one("insert into users(username, password, first, last) values($1, $2, $3, $4) returning first, last," +
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
                console.error('error inserting: ', error);
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


module.exports = {
    addUser: addUser,
    getUserbyId: getUserbyId,
    getUserbyUsername: getUserbyUsername
};