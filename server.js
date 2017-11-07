var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: (3600*10000000000),
    secure: false
  },
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

var cookie;


app.get('/', function(req, res) {
  //Check if the user already has an open session
  if (req.cookies['connect.sid'] === cookie) {
    res.render('index.html');
  } else {
    res.render('login.html');
  }
});

// Login endpoint
app.post('/login', function(req, res) {
  if (!req.body.user || !req.body.pass) {
    res.send('login failed');
  } else if (req.body.user === "test" || req.body.pass === "123") {
    req.session.user = "test";
    cookie = req.cookies['connect.sid'];
    res.redirect('/');
  }
});

//Logout endpoint
app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


app.listen(3000, function() {
  console.log("App Started on PORT 3000");
});
