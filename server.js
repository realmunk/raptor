var express = require('express');
var app = express();
var port = 1337;

app.get('/', function(req, res){
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/testgraphs', function(req, res){
  res.sendfile(__dirname + '/views/testgraphs.html');
});

app.get('/assets/:folder/:file', function(req, res){
  var folder = req.params.folder
    , file = req.params.file;
    res.sendfile(__dirname + '/assets/' + folder + '/' + file);
});

app.get('/views/:file', function(req, res){
  var file = req.params.file;
    res.sendfile(__dirname + '/views/' + file);
});

app.get('/api/me.json', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/me.json');
});

app.get('/api/indicatorGroups.json', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/indicatorGroups.json');
});

app.get('/api/indicatorGroups/oehv9EO3vP7', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/indicator.json');
});

app.get('/api/trends', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/task1_data.json');
});

app.get('/api/comparison', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/task2_data.json');
});

app.get('/api/proportions', function(req, res){
  res.sendfile(__dirname + '/assets/testjson/task3_data.json');
});


app.listen(port);
console.log("Server is listening on port:" + port);