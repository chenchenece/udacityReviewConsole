'use strict';

var https = require('https');
var express = require('express');
var router = express.Router();

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNDUzNiwiZXhwIjoxNDkwODQxOTU1LCJ0b2tlbl90eXBlIjoiYXBpIn0.plRlBl-rX4nMFg8kV7yHOnU76m_Z2GzSV_KGhL04vY4";

var header = {
  'Authorization': token,
  'Accept': 'application/json'
};

router.get('/refresh', function(req, res){
  console.log("Refreshing submission request...");
  var query = req.query;
  refreshProject(query.requestId, function(data){
    console.log("Refreshing submission request: Complete\n");
    console.dir(data);
    console.log("\n\n");
    res.send(data);
  });
});

router.get('/position', function(req,res){
  console.log("Updating position...");
  var query = req.query;
  getPosition(query.position, function(data){
    console.log("Updating position: Complete\n");
    console.dir(data);
    console.log("\n\n");
    res.send(data);
  })
});

router.get('/new', function(req,res){
  console.log("Creating new request...");
  getNew(function(data){
    console.log("Creating new request: Complete\n");
    console.dir(data);
    console.log("\n\n");
    res.send(data);
  })
});

router.get('/request', function(req, res){
  console.log("Updating status of submission request...");
  var query = req.query;
  getRequest(query.requestId, function(data){
    console.log("Updating status of submission request: Complete\n");
    console.dir(data);
    console.log("\n\n");
    res.send(data);
  })
});

function getRequest(requestId, callback){
  var options = {
    host: 'review-api.udacity.com',
    path: '/api/v1/submission_requests/'+requestId,
    method: 'GET',
    headers: header
  };
  httpRequest(options, "", callback);
}

function getNew(callback){
  var data = '{"projects":[{"project_id":52,"language":"en-us"}]}';

  var postHeaders = header;
  postHeaders['Content-Type'] = 'application/json';
  postHeaders['Content-Length'] = Buffer.byteLength(data);

  var options = {
    host: 'review-api.udacity.com',
    path: '/api/v1/submission_requests/',
    method: 'POST',
    headers: postHeaders
  };

  httpRequest(options, data, callback);
}

function getPosition(requestId, callback){
  var options = {
    host: 'review-api.udacity.com',
    path: '/api/v1/submission_requests/'+requestId+'/waits',
    method: 'GET',
    headers: header
  };
  httpRequest(options, "", callback);
}


function refreshProject(requestId, callback){
  var options = {
    host: 'review-api.udacity.com',
    path: '/api/v1/submission_requests/'+requestId+'/refresh',
    method: 'PUT',
    headers: header
  };
  httpRequest(options, "", callback);
}

function httpRequest(options, body, callback){
  var data = '';
  var request = https.request(options, function(response){
    response.setEncoding('utf8');
    response.on('data', function(chunk){
        data+=chunk;
    });
    response.on("end", function(){
      callback(data);
    });
  });
  if(body != ''){
    request.write(body);
  }
  request.end();
}

module.exports = router;
