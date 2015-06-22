/**
 * Ask Sebastian if you have any questions. Last Edit: 22/06/2015
 */

'use strict';

// Requires and node configuration
var node = require('./variables.js');
var test = 0;
var block = {
    blockHeight : 0,
    id : 0,
    generatorPublicKey : "",
    totalAmount : 0,
    totalFee : 0
};

console.log("Starting Miscellaneous Tests");

describe('Miscellaneous tests (peers, blocks, etc)', function() {

    describe('/peers tests', function(){

        before(function (done) {
            node.addPeers(50);
            done();
        });

        test = test + 1;
        it(test + '. Get version of node. Expecting success',function(done){
            node.api.get('/peers/version')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("build");
                    node.expect(res.body).to.have.property("version").to.equal(node.version);
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters: none. Expecting success',function(done){
            var state = "", os = "", shared = "", version = "", limit = "", offset = 0, orderBy = "";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("peers").that.is.an('array');
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters: state. Expecting success',function(done){
            var state = "1", os = "", shared = "", version = "", limit = 100, offset = 0, orderBy = "";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("peers").that.is.an('array');
                    if (res.body.peers.length > 0){
                        for (var i = 0; i < res.body.peers.length; i++){
                           node.expect(res.body.peers[i].state).to.equal(parseInt(state));
                        }
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters: sharePort. Expecting success',function(done){
            var state = "", os = "", shared = "1", version = "", limit = 100, offset = 0, orderBy = "";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("peers").that.is.an('array');
                    if (res.body.peers.length > 0){
                        for (var i = 0; i < res.body.peers.length; i++){
                            node.expect(res.body.peers[i].sharePort).to.equal(parseInt(shared));
                        }
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters: limit. Expecting success',function(done){
            var state = "", os = "", shared = "", version = "", limit = 3, offset = 0, orderBy = "";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("peers").that.is.an('array');
                    node.expect(res.body.peers.length).to.be.at.most(limit);
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters: orderBy. Expecting success',function(done){
            var state = "", os = "", shared = "", version = "", limit = 100, offset = 0, orderBy = "state:desc";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("peers").that.is.an('array');
                    if (res.body.peers.length > 0){
                        for (var i = 0; i < res.body.peers.length; i++){
                            if (res.body.peers[i+1] != null){
                                node.expect(res.body.peers[i+1].state).to.at.most(res.body.peers[i].state);
                            }
                        }
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters but sending limit 99999. Expecting error',function(done){
            var state = "", os = "", shared = "", version = "", limit = 99999, offset = 0, orderBy = "";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get peers list by parameters but sending invalid fields . Expecting success because fields are ORed',function(done){
            var state = "invalid", os = "invalid", shared = "invalid", version = "invalid", limit = "invalid", offset = "invalid", orderBy = "invalid";
            node.api.get('/peers?state='+state+'&os='+os+'&shared='+shared+'&version='+version+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });
    });

    describe('/blocks', function() {

        test = test + 1;
        it(test + '. Get block height. Expecting success',function(done){
            node.api.get('/blocks/getHeight')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("height").to.be.above(0);
                    if (res.body.success == true){
                        block.blockHeight = res.body.height;
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get current fee. Expecting success',function(done){
            node.api.get('/blocks/getFee')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("fee");
                    node.expect(res.body.fee).to.equal(node.Fees.transactionFee * 100);
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: height. Expecting success',function(done){
            var generatorPublicKey = "", totalFee = "", totalAmount = "", previousBlock = "", height = block.blockHeight, limit = 100, offset = 0, orderBy = "";
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    node.expect(res.body.blocks).to.have.length(1);
                    node.expect(res.body.blocks[0]).to.have.property("previousBlock");
                    node.expect(res.body.blocks[0]).to.have.property("totalAmount");
                    node.expect(res.body.blocks[0]).to.have.property("totalFee");
                    node.expect(res.body.blocks[0]).to.have.property("generatorId");
                    node.expect(res.body.blocks[0]).to.have.property("confirmations");
                    node.expect(res.body.blocks[0]).to.have.property("blockSignature");
                    node.expect(res.body.blocks[0]).to.have.property("numberOfTransactions");
                    node.expect(res.body.blocks[0].height).to.equal(block.blockHeight);
                    block.id = res.body.blocks[0].id;
                    block.generatorPublicKey = res.body.blocks[0].generatorPublicKey;
                    block.totalAmount = res.body.blocks[0].totalAmount;
                    block.totalFee = res.body.blocks[0].totalFee;
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: generatorPublicKey. Expecting success',function(done){
            var generatorPublicKey = block.generatorPublicKey, totalFee = "", totalAmount = "", previousBlock = "", height = "", limit = 100, offset = 0, orderBy = "";
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    for (var i = 0; i < res.body.blocks.length; i++){
                        node.expect(res.body.blocks[i].generatorPublicKey).to.equal(block.generatorPublicKey);
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: totalFee. Expecting success',function(done){
            var generatorPublicKey = "", totalFee = block.totalFee, totalAmount = "", previousBlock = "", height = "", limit = 100, offset = 0, orderBy = "";
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    for (var i = 0; i < res.body.blocks.length; i++){
                        node.expect(res.body.blocks[i].totalFee).to.equal(block.totalFee);
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: totalAmount. Expecting success',function(done){
            var generatorPublicKey = "", totalFee = "", totalAmount = block.totalAmount, previousBlock = "", height = "", limit = 100, offset = 0, orderBy = "";
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    for (var i = 0; i < res.body.blocks.length; i++){
                        node.expect(res.body.blocks[i].totalAmount).to.equal(block.totalAmount);
                    }
                    done();
                });
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: previousBlock. Expecting success',function(done){
            var generatorPublicKey = "", totalFee = "", totalAmount = "", previousBlock = block.id, height = "", limit = 100, offset = 0, orderBy = "";
            this.timeout(node.blockTimePlus);
            setTimeout(function(){
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    node.expect(res.body.blocks).to.have.length(1);
                    node.expect(res.body.blocks[0].previousBlock).to.equal(block.id);
                    done();
                });
            }, node.blockTime);
        });

        test = test + 1;
        it(test + '. Get blocks list by parameters: orderBy. Expecting success',function(done){
            var generatorPublicKey = "", totalFee = "", totalAmount = "", previousBlock = "", height = "", limit = 100, offset = 0, orderBy = "height:desc";
            node.api.get('/blocks?generatorPublicKey='+generatorPublicKey+'&totalFee='+totalFee+'&totalAmount='+totalAmount+'&previousBlock='+previousBlock+'&height='+height+'&limit='+limit+'&offset='+offset+'orderBy='+orderBy)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res){
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("blocks").that.is.an('array');
                    for (var i = 0; i < res.body.blocks.length; i++){
                        if (res.body.blocks[i+1] != null){
                            node.expect(res.body.blocks[i].height).to.be.above(res.body.blocks[i+1].height);
                        }
                    }
                    done();
                });
        });
    });

});