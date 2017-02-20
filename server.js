var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const userInfo = { currentUser: {username: 'test'},
    userLists: [{id: 1, name: 'test'}],
    listItems: [{id: 1, item: 'my Item', listId: 1}] 
    }

app.get('/userInfo', (req, res) => {
  res.json({ currentUser: {username: 'test'},
    userLists: [{id: 1, name: 'test'}],
    listItems: [{id: 1, item: 'my Item', listId: 1}] 
    })
  // res.sendfile((path.resolve(__dirname, '../client', 'build', 'index.html'))
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
