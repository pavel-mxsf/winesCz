var should = require('should');
var xlsParser = require("xlsParser");


describe('XLS parser', function(){
    var xls = '';
    before(function(done){
        this.timeout(5000);
        xlsParser.parseXlsFile(__dirname + '/test.xls')
            .then(function(data){
                xls = data;})
            .done(done);
    });

    describe('verify xls', function(){
        it('should have xls object loaded', function(){
                xls.should.be.an.Object;
            }
        )
    });

    describe('cell position parsing', function(){
        it('parse A10 to {row:10, column:A}', function(){
            xlsParser.parsePosition('A10').should.eql({row:10, column:'A'});
        });
    });

});