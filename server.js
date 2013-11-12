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

app.listen(port);
console.log("Server is listening on port:" + port);