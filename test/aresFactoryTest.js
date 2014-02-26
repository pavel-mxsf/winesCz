'use strict';
var should = require('should');
var ares = require('aresFactory');

describe('ares factory', function () {
    this.timeout(30000);
    describe('get address from ico', function () {
        it('should return address in json', function(done){
            var ico = 12314153;
            ares(ico)
                .then(function(data){
                    data.street.should.be.ok;
                    data.postCode.should.be.equal(69101);
                })
                .fin(done);
        });
    });
});