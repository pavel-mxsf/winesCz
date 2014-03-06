var wineListLoader = require('wineListLoader');
var winesExporter = require('winesExporter');



var toDataFile = winesExporter.toFile('data2.json');

var toMongo = winesExporter.toMongo({
    host:'ds031359.mongolab.com',
    port: 31359,
    db: 'winescz',
    username: 'paja',
    password: 'nasrat'
    });

wineListLoader.listWinesFromDir('./xls')
    .then(toMongo)
    .then(function(){console.log('saved')})
    .catch(function(err){console.log(err)});
