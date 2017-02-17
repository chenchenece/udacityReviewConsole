/**
  *Entry point for the node application
  */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use("/static", express.static(__dirname + "/dist"));


app.listen(3000, function(){
    console.log("The application is running on port 3000");
})
