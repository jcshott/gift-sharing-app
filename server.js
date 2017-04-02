import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

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

// routes
app.use(require('./routes'));

// authentication
// import passport from 'passport';
// import flash from 'connect-flash';
// var localPassport = require('./config/passport')(passport);
//
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


//   // res.sendfile((path.resolve(__dirname, '../client', 'build', 'index.html'))
// });

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
