var should = require('should');
var xlsReader = require("xlsReader");

describe('XLS reader', function(){
    describe('read xls file', function(){
        this.timeout(3000);
        it('should open xls', function(done){
            xlsReader(__dirname + '/xls/test.xls')
                .then(function(data){
                    data.should.be.an.Object;
                    data.should.have.property('Sheets');
                    })
                .done(done);
        })
    })
});