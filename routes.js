import express from 'express';
import * as db from './utils/queries';

const router = express.Router();


///// USER MANAGEMENT ROUTES //////

router.post('/login', (req, res, next) => {
    let user;
    db.getUserbyUsername(req.body.username)
        .then(userInfo => {
            user = userInfo;
            if(userInfo.password !== req.body.password) {
                throw new Error('PASSWORD_ERROR');
            }
            return db.getUserLists(userInfo.id);
        })
        .then(listInfo => {
            return res.json({
                currentUser: {username: user.username, userId: user.id, first: user.first},
                userLists: listInfo
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
                return res.json({
                    currentUser: {}
                })
            } else {
                return db.addUser(req.body);
            };
        })
        .then(newUser => {
            return res.json({
                currentUser: {username: newUser.username},
                userLists: [],
                listItems: []
            });
        })
        // TODO: better error handling
        .catch(error => {
            next(error);
        })
});

///// USER LIST MANAGEMENT ROUTES //////

router.route('/userLists')
    .get((req, res, next) => {
        db.getUserLists(req.body.userId)
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
        db.addList(req.body.name, req.body.userId)
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
        let userId = req.body.userId;
        db.removeList(req.body.listId)
            .then(() => {
                return db.getUserLists(userId)
                    .then(userLists => {
                        return res.json({
                            userLists: userLists
                        });
                    })
            })
            .catch(error => {
                console.log(error);
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
        let listId = parseInt(req.params.listId);
        db.removeItem(req.body.itemId)
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
