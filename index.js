var restify = require('restify');
var url = require('url');
var path = require('path');
var server = restify.createServer();
var request = require('superagent');
var id;
var registrationIds = [];

function addRegistration(regisId) {
  for (var i = 0; i < registrationIds.length;i++) {
    if (registrationIds[i] === regisId) {
      return false;
    }
  }
  
  registrationIds.push(regisId);
  return true;
}

server.use(restify.bodyParser());

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.post('/register-notification', function(req, res, next){
  addRegistration(path.parse(url.parse(req.params.endpoint).path).name);
  res.send(200);
  return next();
});

server.get('/showNotification', function(req, res, next) {
  console.log('Received request');
  res.send(200, {
    notification: {
      message: 'Issue #' + id + ' has been verified'
    }
  });
  return next();
});

server.get('/notification/:notId', function(req, res, next) {
  id = req.params.notId;
  
  request
    .post('https://android.googleapis.com/gcm/send')
    .send({
      registration_ids: registrationIds
    })
    .set('Content-Type', 'application/json')
    .set('Authorization', 'key=AIzaSyBu8AFbZ955rrD4JkxLpMBdXOCyw2zpvZ8')
    .end(function(err, resp) {
      res.send(200);
    });
  return next();
});

server.listen(7777, function() {
  console.log('Server on!');
});