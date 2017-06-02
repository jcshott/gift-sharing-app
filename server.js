import express from 'express';
import bodyParser from 'body-parser';
const path = require('path');

const app = express();
const config = require('./config.json');


// environment
app.set('port', (process.env.PORT || 3001));

// Middleware
app.use(bodyParser());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// routes
app.use(require('./routes'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
