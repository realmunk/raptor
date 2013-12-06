var express = require('express');
var app = express();
var port = 1337;

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/manifest.webapp', function(req, res) {
  res.sendfile(__dirname + '/manifest.webapp');
});

app.get('/testgraphs', function(req, res) {
  res.sendfile(__dirname + '/views/testgraphs.html');
});

app.get('/assets/css/lib/:file', function(req, res) {
  var folder = req.params.folder, 
    file = req.params.file;
  res.sendfile(__dirname + '/assets/css/lib/' + file);
});

app.get('/assets/:folder/:file', function(req, res) {
  var folder = req.params.folder, 
    file = req.params.file;
  res.sendfile(__dirname + '/assets/' + folder + '/' + file);
});


app.get('/views/:file', function(req, res) {
  var file = req.params.file;
  res.sendfile(__dirname + '/views/' + file);
});

app.get('/api/me.json', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/me.json');
});

app.get('/api/indicatorGroups.json', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/indicatorGroups.json');
});

app.get('/api/indicatorGroups/:id', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/indicatorGroup.json');
});

app.get('/api/analytics1.js?:anything', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/trends.json');
});

app.get('/api/analytics2.js?:anything', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/comparison.json');
});

app.get('/api/analytics3.js?:anything', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/proportions.json');
});


app.get('/api/trends', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/task1_data.json');
});

app.get('/api/comparison', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/task2_data.json');
});

app.get('/api/proportions', function(req, res) {
  res.sendfile(__dirname + '/assets/.testdata/task3_data.json');
});

app.listen(port);
console.log("Server is listening on port:" + port);