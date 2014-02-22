'use strict';
var should = require('should');
var xlsParser = require("xlsParser");


describe('XLS parser', function(){
    var wineList = '';

    before(function(done){
        this.timeout(5000);
        xlsParser.parseXlsFile(__dirname + '/test.xls')
            .then(function(data){
                wineList = data;})
            .done(done);
    });

    describe('utils', function(){
        it('should parse A10 to {row:10, column:A}', function(){
            xlsParser.private.parsePosition('A10').should.eql({row:10, column:'A'});
        });
        it('should return undefined if it is not cell position', function(){
            should(xlsParser.private.parsePosition('notPosition')).not.be.ok;
        });
        it('should reject incomplete line', function(){
            var obj = {
                A: {
                    v: 'Vzorky vína - výpis',
                    ixfe: 64,
                    t: 's',
                    XF: {},
                    w: 'Vzorky vína - výpis'
                }
            };
            xlsParser.private.validateRow(obj).should.be.false;
        });
        it('should reject header', function(){
            var obj = {
                A:
                { v: 'Obchodní označení vína',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Obchodní označení vína' },
                B:
                { v: 'Evidenční číslo jakosti',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Evidenční číslo jakosti' },
                C:
                { v: 'Šarže',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Šarže' },
                D:
                { v: 'Zeměpisné údaje původu vína',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Zeměpisné údaje původu vína' },
                E:
                { v: 'Ročník vína',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Ročník vína' },
                F:
                { v: 'Výrobce vína',
                    ixfe: 66,
                    t: 's',
                    XF: { ifnt: 23, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                    w: 'Výrobce vína' } };
            xlsParser.private.validateRow(obj).should.be.false;
        });
        it('should transform row obj to wine obj', function(){
            var row = { A:
           { v: 'Ryzlink rýnský, jakostní víno s přívlastkem výběr z hroznů',
               ixfe: 15,
               t: 's',
               XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
               w: 'Ryzlink rýnský, jakostní víno s přívlastkem výběr z hroznů' },
               B:
               { v: '112F1-13 č.vz. 7',
                   ixfe: 15,
                   t: 's',
                   XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                   w: '112F1-13 č.vz. 7' },
               C:
               { v: '135',
                   ixfe: 15,
                   t: 's',
                   XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                   w: '135' },
               D:
               { v: 'Morava, slovácká',
                   ixfe: 15,
                   t: 's',
                   XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                   w: 'Morava, slovácká' },
               E:
               { v: '2012',
                   ixfe: 15,
                   t: 's',
                   XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                   w: '2012' },
               F:
               { v: '68687508, Tomáš Krist',
                   ixfe: 15,
                   t: 's',
                   XF: { ifnt: 0, ifmt: 0, flags: 1, fStyle: 0, data: undefined },
                   w: '68687508, Tomáš Krist' } }
            xlsParser.private.validateRow(row).should.be.true;
            var wine = xlsParser.private.rowToObject(row);
            wine.should.have.property('vintage', 2012);
            wine.should.have.property('producer', 'Tomáš Krist');
            wine.should.have.property('producerNo', 68687508);
            wine.should.have.property('region', 'Morava');
            wine.should.have.property('subregion', 'slovácká');
            wine.should.have.property('regNum', '112F1-13 č.vz. 7');
            wine.should.have.property('batch', '135');
            wine.should.have.property('fullName', 'Ryzlink rýnský, jakostní víno s přívlastkem výběr z hroznů');
        });
    });

    describe('parsing xls object to array', function(){
        it('should return array', function(){
            wineList.should.be.an.Array;
            wineList.should.have.length(115);
        });
        it('should have vintage property', function(){
            wineList[0].vintage.should.be.an.Number;
        });
    });
});