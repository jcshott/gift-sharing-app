import _ from 'lodash';
import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// db & queries
import * as db from './utils/queries';

const app = express();

// environment
app.set('port', (process.env.PORT || 3001));

app.use(cookieParser('keyboard cat'));
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false  }));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// authentication
// import passport from 'passport';
// import flash from 'connect-flash';
// var localPassport = require('./config/passport')(passport);
//
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


////// Routes //////

app.post('/login', (req, res, next) => {
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

app.post('/signup', (req, res, next) => {
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


app.get('/userInfo', (req, res) => {
    let user = req.user;
    if (!user) {
        res.json({ currentUser: {}});
    } else {
        let userInfo = getUserbyId(user.id);

        res.json({
            currentUser: {username: user.username},
            userLists: userInfo.userLists,
            listItems: userInfo.listItems
        });
    }
});




//   // res.sendfile((path.resolve(__dirname, '../client', 'build', 'index.html'))
// });

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
