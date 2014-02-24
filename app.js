var wineListLoader = require('wineListLoader');
var fs = require('fs');
wineListLoader.listWinesFromDir('./test/xls').then(
    function(data) {
        fs.writeFile('data.json', JSON.stringify(data[0].value, null, 4), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
)