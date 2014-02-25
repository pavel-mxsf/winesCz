var wineListLoader = require('wineListLoader');
var winesExporter = require('winesExporter');



var toDataFile = winesExporter.toFile('data2.json');

wineListLoader.listWinesFromDir('./xls')
    .then(toDataFile)
    .then(function(){console.log('saved')})
    .catch(function(err){console.log(err)})
