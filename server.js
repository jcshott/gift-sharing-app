var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/*', (req, res) => {
  res.send('Hello World!')
  // res.sendfile((path.resolve(__dirname, '../client', 'build', 'index.html'))
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
