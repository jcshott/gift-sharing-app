var _ = require('lodash'),
    localStrategy = require('passport-local').Strategy,
    async = require('async'),
    fs = require('fs'),
    path = require('path');

var userDB = path.resolve(__dirname, '../users.json')

function addUser(userObj, callback) {
   var newUser = fs.readFile(userDB, function(err, content){
        if (err) throw err;
        var currData = JSON.parse(content),
            userId = currData.users.length + 1;
        var user = {
            id: userId,
            username: userObj.username,
            password: userObj.password,
            first: userObj.first,
            last: userObj.last
        };
        currData.users.push(
            user
        );
        currData.useInfo.push(
            {
                id: userId,
                userLists: [],
                listItems: [],
            }
        );
        fs.writeFile(userDB, JSON.stringify(currData), function(err){
            if(err) throw err;
        })
      return user
    });

   callback(null, newUser);
}

function checkUser(username, cb){
    var existing = fs.readFile(userDB, function(err, content){
        if (err) throw err;
        var currData = JSON.parse(content);

        let user = _.find(currData.users, (u) => u.username === username);
        if (!user) {
            cb({err: "user already exists"});
        } else {
            cb(null, null);
        }
    });
    return existing;
}

module.exports = function(passport) {
    // tell passport how to serialize and deserialize user instances to and from the session.
    // The typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when deserializing.
    passport.serializeUser(function(user, done) {
        // done callback function (error, user.id to store in session)
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        var userInfo = fs.readFile(userDB, function(err, content){
            if (err) throw err;
            var currData = JSON.parse(content);

            let user = _.find(currData.users, (u) => u.id === id);
            if (!user) {
                return null;
            } else {
                return user;
            }
        });
        if(userInfo){
            done(null, userInfo);
        }
        else{
            done('error', null);
        }
    });

    // TODO: better error handling of looking up user for both configuring localStrategy & session handling
    // configure authentication
    // if authorized, user will be user obj {id: num, username: "", password: ""}

    passport.use('local-login', new localStrategy({
        // config for passport
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true //  Pass back entire request to the callback

    },
        // callback to verify log in
        function(req, username, password, done) {
            var loggedIn = fs.readFile(userDB, function(err, content){
                if (err) throw err;
                var currData = JSON.parse(content);

                let user = _.find(currData.users, (u) => u.username === username);
                if (!user) {
                    return false;
                }
                if (user.password !== password) {
                    return false;
                }
                // done is callback(error, user-to-add-to-session, opt: {message: " "} if want to flash message)
                return user;
            });
            if(loggedIn){
                return done(null, loggedIn);
            } else{
                return done(null, false);
            }
        }
    ));

    passport.use('local-signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, username, password, done) {
            process.nextTick(function() {
                async.auto({
                    doesUserExist: function(cb, results) {
                        checkUser(username, cb);

                    },
                    newAccount: ['doesUserExist',
                        function(cb, results) {
                            var newUser = {
                                username: username,
                                password: password
                            };
                            addUser(newUser, cb);
                        }
                    ]
                }, function(err, results) {
                    if(err) {
                        done(null, false);
                    } else {
                        done(null, results.newAccount);
                    }
                });
            });

        })
    );
};

