var wineListLoader = require('wineListLoader');
var winesExporter = require('winesExporter');



var toDataFile = winesExporter.toFile('data2.json');

var toMongo = winesExporter.toMongo({
    host:'**.mongolab.com',
    port: 31359,
    db: 'winescz',
    username: '**',
    password: '**',
    collection:'wines'
    });

wineListLoader.listWinesFromDir('./xls')
    .then(toMongo)
    .then(function(){console.log('saved')})
    .catch(function(err){console.log(err)});
