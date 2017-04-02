import express from 'express';
import * as db from './utils/queries';

const router = express.Router();

router.post('/login', (req, res, next) => {
    db.getUserbyUsername(req.body.username)
        .then(function (userInfo) {
            return res.json({
                currentUser: {username: userInfo.username},
                userLists: [],
                listItems: []
            });
        })
        .catch(error => {
            return res.json({
                currentUser: {}
            });
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
            }
            return db.addUser(req.body);
        })
        .then(newUser => {
            return res.json({
                currentUser: {username: newUser.username},
                userLists: [],
                listItems: []
            });
        })
        // TODO: better error handling
        .catch(err => {
            return res.json({
                currentUser: {}
            });
        })
});


// router.get('/userInfo', (req, res) => {
//     let user = req.user;
//     if (!user) {
//         res.json({ currentUser: {}});
//     } else {
//         let userInfo = getUserbyId(user.id);
//
//         res.json({
//             currentUser: {username: user.username},
//             userLists: userInfo.userLists,
//             listItems: userInfo.listItems
//         });
//     }
// });


module.exports = router;
