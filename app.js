var express = require('express');
var mongoose = require('mongoose');
var app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.query());

var options = {
    host:'ds031359.mongolab.com',
    port: 31359,
    db: 'winescz',
    username: 'paja',
    password: 'nasrat',
    collection:'wines'
};

mongoose.connect('mongodb://' + options.username + ':' + options.password + '@'+ options.host + ':' + options.port + '/' + options.db);

app.get('/', function(req, res){
    res.send('Hello World');
});

var winesSchema = new mongoose.Schema({
        vintage:"Number",
        fullName:"String",
        producer:"String",
        producerId: "Number"}
    , {collection: 'wines'});
var wine = mongoose.model('wines', winesSchema);

app.get('/wines', function(req,res){
    var filteredQuery = {};
    var acceptableFields = [
            'producerId',
            'vintage',
            'batch',
            'regNum'];
    var likeFields = [
            'region',
            'subregion',
            'producer',
            'variety',
            'type',
            'fullName',
            'grade'
        ];
    var likeSearchString = [
        'search'
        ];
    acceptableFields.forEach(function(field) {
        if (req.query[field]) {filteredQuery[field] = req.query[field];}
    });
    likeFields.forEach(function(field) {
        if (req.query[field]) {filteredQuery[field] = {'$regex': req.query[field]}}
    });
    likeSearchString.forEach(function(field) {
        if (req.query[field]) {filteredQuery[field] = {'$regex': req.query[field].toLowerCase()}}
    });

    req.query.limit = req.query.limit || 20;
    req.query.skip = req.query.skip || 0;
    wine.find(filteredQuery)
        .skip(req.query.skip)
        .limit(req.query.limit)
        .exec(function(err,docs) {
           if(err) {
               console.log(err);
               res.send(err);
           } else {
               res.send(docs);
           }
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

