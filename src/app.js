/**
  *Entry point for the node application
  */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

var ajax = require('./routes/ajax');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

app.use("/static", express.static(__dirname + "/dist"));

app.set('view engine', 'pug');
app.set('views', __dirname +  '/templates')

app.use('/ajax', ajax);


app.get("*", function(req, res){
  res.render('index');
});

app.listen(3000, function(){
    console.log("The application is running on port 3000");
})
