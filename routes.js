import _ from 'lodash';
import express from 'express';
import * as db from './utils/queries';
import * as utils from './utils/token';
const jwt = require('jsonwebtoken');
const config = require('./config.json');


const router = express.Router();

var checkToken = function(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.headers['authorization'];
    if (!token) {
        next(); //if no token, continue
    } else {
        token = token.replace('Bearer ', '');

        jwt.verify(token, config.JWT_SECRET, function(err, user) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Please register or log in'
                });
            } else {
                req.user = user; //set the user to req so other routes can use it
                next();
            }
        });
    }

}
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
router.use(checkToken);


router.get('/userInfoFromToken', (req, res, next) => {
// check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({message: 'Token not found'});
    }
    utils.verifyToken(token, function(err, user) {
        if (err) throw err;
        let currUser = user;
        db.getUserbyId(user.id)
            .then(userInfo => {
                currUser = userInfo;
                return db.getUserLists(userInfo.id);
            })
            .then(listInfo => {
                return res.json({
                    currentUser: {username: currUser.username, userId: currUser.id, first: currUser.first},
                    userLists: listInfo,
                    token: token,
                });
            })
            .catch(error => {
                return res.status(400).json({error: error});
            })
    })
});

///// USER MANAGEMENT ROUTES //////

router.post('/login', (req, res, next) => {
    let user;
    db.getUserbyUsername(req.body.username)
        .then(userInfo => {
            user = userInfo;
            if (userInfo.password !== req.body.password) {
                throw new Error('PASSWORD_ERROR');
            }
            return db.getUserLists(user.id);
        })
        .then(listInfo => {
            let token = utils.generateToken(user);
            return res.json({
                currentUser: {username: user.username, userId: user.id, first: user.first},
                userLists: listInfo,
                token: token,
            });
        })
        // TODO: better error handling
        .catch(error => {
            return res.status(400).json({error: error});
        })
});

router.post('/signup', (req, res, next) => {
    db.getUserbyUsername(req.body.username)
        .then(userInfo => {
            if (userInfo) {
                // TODO: handle sending message back to user that username is taken
                throw new Error('USER_EXISTS')
            } else {
                return db.addUser(req.body);
            };
        })
        .then(newUser => {
            let token = utils.generateToken(newUser);
            return res.json({
                currentUser: {username: newUser.username, first: newUser.first},
                userLists: [],
                listItems: [],
                token: token,
            });
        })
        // TODO: better error handling
        .catch(error => {
            return res.status(409).json({error: error});
        })
});

///// USER LIST MANAGEMENT ROUTES //////
// TODO: response if not logged in.
router.route('/userLists')
    .get((req, res, next) => {
        db.getUserLists(req.user.id)
            .then(userLists => {
                return res.json({
                    userLists: userLists
                });
            })
            .catch(error => {
                next(error);
            })
    })
    .post((req, res, next) => {
        db.addList(req.body.name, req.user.id)
            .then(userLists => {
                return res.json({
                    userLists: userLists
                });
            })
            .catch(error => {
                next(error);
            });
    })
    .delete((req, res, next) => {
        let user = req.user;
        db.removeList(req.body.listId)
            .then(() => {
                return db.getUserLists(user.id)
                    .then(userLists => {
                        return res.json({
                            userLists: userLists
                        });
                    })
            })
            .catch(error => {
                console.log('error in userList route: ', error);
                next(error);
            })
    });

///// LIST ITEM MANAGEMENT ROUTES //////

router.route('/listItems/:listId')
    .get((req, res, next) => {
        let listId = parseInt(req.params.listId);
        db.getListItems(listId)
            .then(listItems => {
                return res.json({
                    listItems: listItems
                });
            })
            .catch(error => {
                next(error);
            })
    })
    .post((req, res, next) => {
        let listId = parseInt(req.params.listId);
        db.addItem(req.body.description, listId)
            .then(listItems => {
                return res.json({
                    listItems: listItems
                })
            })
            .catch(error => {
                console.log(error);
                next(error);
            })
    })
    .delete((req, res, next) => {
        let listId = parseInt(req.params.listId),
            itemId = parseInt(req.body.itemId);
        db.removeItem(itemId)
            .then(() => {
                return db.getListItems(listId)
                    .then(listItems => {
                        return res.json({
                            listItems: listItems
                        });
                    })
            })
        .catch(error => {
            console.log(error);
            next(error);
        })
    });


module.exports = router;
