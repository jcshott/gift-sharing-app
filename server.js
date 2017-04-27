import express from 'express';
// import session from 'express-session'
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const config = require('./config.json');


// environment
app.set('port', (process.env.PORT || 3001));

// Middleware
app.use(bodyParser());
// app.use(cookieParser('keyboard cat'));
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// routes
app.use(require('./routes'));



//   // res.sendfile((path.resolve(__dirname, '../client', 'build', 'index.html'))
// });

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
