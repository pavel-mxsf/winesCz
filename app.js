var wineListLoader = require('wineListLoader');
var fs = require('fs');
wineListLoader.listWinesFromDir('./xls').then(
    function(data) {
        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
)