var _ = require('lodash');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;



// TODO: better error handling of looking up user for both configuring localStrategy & session handling
// configure authentication
// if authorized, user will be user obj {id: num, username: "", password: ""}
passport.use(new localStrategy(
    function(username, password, done) {
        let user = _.find(Users, (u) => u.username === username);
        if (!user) {
            return done(null, false);
        }
        if (user.password !== password) {
            return done(null, false);
        }
        // done is callback(error, user-to-add-to-session, opt: {message: " "} if want to flash message)
        return done(null, user);
    }
));

// tell passport how to serialize and deserialize user instances to and from the session.
// The typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when deserializing.
passport.serializeUser(function(user, done) {
    // done callback function (error, user.id to store in session)
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    //find the user by id
    let user = _.find(Users, (u) => u.id === id);
    if (!user) {
        done('error', null);
    } else {
        done(null, user);
    }
});


var app = express();


app.set('port', (process.env.PORT || 3001));

app.use(cookieParser('keyboard cat'));
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false  }));
app.use(passport.initialize());
app.use(passport.session());


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// test users & lists
const Users = [
   {
        id: 1,
        username: 'test',
        password: 'testing'
    },
    {
        id: 2,
        username: 'rocky',
        password: 'walks'
    }
];

const UserInfo = [
    {
        id: 1,
        userLists: [{id: 1, name: 'testList'}],
        listItems: [{id: 1, item: 'my Item', listId: 1}]
    },
    {
        id: 2,
        userLists: [{id: 1, name: '2testList'}],
        listItems: [{id: 1, item: 'someone else\'s Item', listId: 1}]
    }
];

// authentication route
app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.redirect('/userInfo');
    }
);

// if authenticated, this sends user's information
app.get('/userInfo', (req, res) => {
    let user = req.user;
    if (!user) {
        res.json({ currentUser: {}});
    } else {
        let userInfo = _.find(UserInfo, (obj) => {
            return obj.id === user.id
        });

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
