const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const Query = require('./util/Query');
const db = require('./util/postgres');

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.listen(8080, function(){
  console.log('server started port 8080');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "think free");
  next();
});

app.get('/', function (req, res) {
  /*var query = new Query('SELECT title, description, body FROM posts ORDER BY postid DESC')
  data = query.runQuery();
  console.log(data);
  var comment = new Query('SELECT commentid, username, body FROM comments WHERE postid = $1')
  //commentlist = comment.runQuery(data[0].postid);
  */
 try{
  db.query('SELECT title, description, body, postid FROM posts ORDER BY postid DESC')
    .then(resp => {
      let blogs = resp.rows;
      let thisId = [];
      thisId[0] = blogs[0].postid;
      db.query('SELECT commentid, username, body FROM comments WHERE postid=$1', thisId)
        .then(comm => {
          comnts = comm.rows;
          res.render('index', {
            title: blogs[0].title, 
            description: blogs[0].description, 
            body: blogs[0].body,
            comments: comnts});
          });
    })
    }catch(err){
      console.log('error: ', err);
    }
});

function getData(data) {

}

/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
*/