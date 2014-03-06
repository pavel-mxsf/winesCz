var express = require('express');
var restify = require('restify');
var db = require('dbFactory');
var app = express();

app.use(express.bodyParser());
app.use(express.query());

var options = {
    host:'ds031359.mongolab.com',
    port: 31359,
    db: 'winescz',
    username: 'paja',
    password: 'nasrat',
    collection:'wines'
};

db.connect('mongodb://' + options.host + ':' + options.port + '/' + options.db);

