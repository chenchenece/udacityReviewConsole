'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

// API access token
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNDUzNiwiZXhwIjoxNDkwODQxOTU1LCJ0b2tlbl90eXBlIjoiYXBpIn0.plRlBl-rX4nMFg8kV7yHOnU76m_Z2GzSV_KGhL04vY4";

// A general header object for all requests
var header = {
  'Authorization': token,
  'Accept': 'application/json'
};

router.get('/refresh', function(req, res){
  console.log("Refreshing submission request...");
  refreshSubmissionRequest(req.query.requestId, function(data){
    console.log("Refreshing submission request: Complete\n"+ data+ "\n\n");
    res.send(data);
  });
});

router.get('/position', function(req,res){
  console.log("Updating position...");
  positionOfSubmissionRequest(req.query.requestId, function(data){
    console.log("Updating position: Complete\n"+ data+ "\n\n");
    res.send(data);
  });
});

router.get('/new', function(req,res){
  console.log("Creating new request...");
  newSubmissionRequest(function(data){
    console.log("Creating new request: Complete\n"+ data+ "\n\n");
    res.send(data);
  });
});

router.get('/request', function(req, res){
  console.log("Updating status of submission request...");
  getSubmissionRequest(req.query.requestId, function(data){
    console.log("Updating status of submission request: Complete\n"+ data+ "\n\n");
    res.send(data);
  });
});

function getSubmissionRequest(requestId, callback){
  var options = {
    url: 'https://review-api.udacity.com/api/v1/submission_requests/'+requestId,
    headers: header
  };
  httpRequest(options, callback);
}

function newSubmissionRequest(callback){
  var data = '{"projects":[{"project_id":52,"language":"en-us"}]}';

  //Copy the global header variable and add new key-vaue pairs to it
  var postHeaders = JSON.parse(JSON.stringify(header));
  postHeaders['Content-Type'] = 'application/json';
  postHeaders['Content-Length'] = Buffer.byteLength(data);

  var options = {
    url: 'https://review-api.udacity.com/api/v1/submission_requests/',
    method: 'POST',
    headers: postHeaders,
    body: data
  };
  httpRequest(options, callback);
}

function positionOfSubmissionRequest(requestId, callback){
  var options = {
    url: 'https://review-api.udacity.com/api/v1/submission_requests/'+requestId+'/waits',
    headers: header
  };
  httpRequest(options, callback);
}


function refreshSubmissionRequest(requestId, callback){
  var options = {
    url: 'https://review-api.udacity.com/api/v1/submission_requests/'+requestId+'/refresh',
    method: 'PUT',
    headers: header
  };
  httpRequest(options, callback);
}

// A helper function that makes a request using the given options and makes a callback
//with the response
function httpRequest(options, callback){

  var onResponse = function(error, response, body){
    if(error) console.log(error);
    callback(body);
  };
  request(options, onResponse);
}

module.exports = router;
