// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  res.json(comments);
});

app.post('/comments', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    res.json(comments);
  });
});

app.listen(3000);
console.log('Server started: http://localhost:3000/');