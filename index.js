// DEPENDENCIES
// ============
var express = require('express');
var path = require('path');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var port = (process.env.PORT || 8001);

var server = express();

server.use(errorHandler({
    dumpExceptions:true,
    showStack:true
}));

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(express.static(path.join(__dirname, './')));

server.listen(port, function () {
  console.log('Server running on ' + port);
});
