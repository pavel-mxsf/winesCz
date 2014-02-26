'use strict';
var should = require('should');
var q = require('q');
var wineListLoader = require('wineListLoader');

describe('wine list loader', function(){
    describe('directory reader', function(){
        this.timeout(20000);
        it('should read all files in /xls/ directory', function(done){
            wineListLoader.listDirectory(__dirname + '/xls/')
                .then(function(data) {
                    data.should.be.an.Array;
                    data.should.have.length(1);
                })
                .catch(function(err){done(err)})
                .done(function(){done()});
        });
        it('should return array of wines', function (done){
            wineListLoader.listWinesFromDir(__dirname + '/xls/')
                .then(function(data) {
                    data.should.be.an.Array;
                    data.should.have.lengthOf(115);
                })
                .fin(function(){done()});
        });
    });
});