'use strict';

var fs  = require('fs'),
    express = require('express'),
    consolidate = require('consolidate'),
    swig  = require('swig'),
    path  = require('path'),
    file = require('./controller/file'),
    layers = require('./model/layers'),
    config  = require(path.join(__dirname,'..') + '/config.json');

var app = express();

app.engine('twig', consolidate.swig);

app.set('view engine', 'twig');

app.set('views', 'guide/views');

app.use('/', express.static(path.join(__dirname,'..') + '/'));

app.get('/', function(req, res){
    res.render('index', config);
});

app.use('/file', file);

app.listen(3000, function(){
    console.log('Everything is running');
});
