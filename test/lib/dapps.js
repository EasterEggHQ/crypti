/**
 * Ask Sebastian if you have any questions. Last Edit: 25/08/2015
 */

'use strict';

var path = require('path');

// Requires and node configuration
var node = require('./../variables.js');
var test = 0;
var siaDappName = "";
var gitDappName = "";
var Dapp = {};
var DappToInstall = {};
var installedDapp = {};
var randomXCR = 0;
var transactionCount = 0;
var transactionList = [];

// Used for calculating amounts
var expectedFee = 0;
var totalTxFee = 0;

// Create random accounts
var Account1 = node.randomTxAccount();
var Account2 = node.randomTxAccount();
var Account3 = node.randomTxAccount();

console.log("Starting Dapps test suite");

describe('Dapps', function() {

    before(function (done) {
        /*
         function openAccount(account) {
         console.log('Opening Account with password: ' + account.password);
         node.api.post('/accounts/open')
         .set('Accept', 'application/json')
         .send({
         secret: account.password,
         secondSecret: account.secondPassword
         })
         .expect('Content-Type', /json/)
         .expect(200)
         .end(function (err, res) {
         console.log(res.body);
         node.expect(res.body).to.have.property("success").to.be.true;
         account.address = res.body.account.address;
         account.publicKey = res.body.account.publicKey;
         account.balance = res.body.account.balance;
         });
         }

         openAccount(Account1);
         openAccount(Account2);
         */
        /*
         function sendXCR(account) {
         console.log("PRINTING ACCOUNT:");
         console.log(account);
         console.log('We send the XCR from foundation account to account. Recipient is: ' + account.address);
         setTimeout(function () {
         randomXCR = (Math.random() * 1000000000000).toFixed(0);
         expectedFee = (randomXCR * node.transactionFee).toFixed(0);
         node.api.put('/transactions')
         .set('Accept', 'application/json')
         .send({
         secret: node.Faccount.password,
         amount: randomXCR,
         recipientId: account.address
         })
         .expect('Content-Type', /json/)
         .expect(200)
         .end(function (err, res) {
         console.log(res.body);
         console.log('Sent to ' + account.address + ' ' + (randomXCR / node.normalizer) + ' XCR');
         console.log('Expected fee (paid by sender): ' + expectedFee / node.normalizer + ' XCR');
         node.expect(res.body).to.have.property("success").to.be.true;
         if (res.body.success == true) {
         account.transactions.push(transactionCount);
         transactionCount += 1;
         totalTxFee += (expectedFee / node.normalizer);
         account.balance += randomXCR;
         transactionList[transactionCount - 1] = {
         'sender': node.Faccount.address,
         'recipient': account.address,
         'brutoSent': (randomXCR + expectedFee) / node.normalizer,
         'fee': expectedFee / node.normalizer,
         'nettoSent': randomXCR / node.normalizer,
         'txId': res.body.transactionId
         }
         }
         // console.log("Tx " + JSON.stringify(transactionList[transactionCount-1]));
         // console.log("Account: " + JSON.stringify(account));
         // console.log("Total Tx Fee: " + totalTxFee);
         });
         }, 2000);
         }

         sendXCR(Account1);
         sendXCR(Account2);
         done();
         */
        node.api.post('/accounts/open')
            .set('Accept', 'application/json')
            .send({
                secret: Account1.password,
                secondSecret: Account1.secondPassword
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                console.log('Opening Account 1 with password: ' + Account1.password);
                node.expect(res.body).to.have.property("success").to.be.true;
                if (res.body.success == true && res.body.account != null){
                    Account1.address = res.body.account.address;
                    Account1.publicKey = res.body.account.publicKey;
                    Account1.balance = res.body.account.balance;
                }
                else {
                    console.log('Unable to open account1, tests will fail');
                    console.log('Data sent: secret: ' + Account1.password + ' , secondSecret: ' + Account1.secondPassword );
                    node.expect("TEST").to.equal("FAILED");
                }
                done();
            });
    });

    before(function (done) {
        node.api.post('/accounts/open')
            .set('Accept', 'application/json')
            .send({
                secret: Account2.password,
                secondSecret: Account2.secondPassword
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                console.log('Opening Account 2 with password: ' + Account2.password);
                node.expect(res.body).to.have.property("success").to.be.true;
                if (res.body.success == true && res.body.account != null) {
                    Account2.address = res.body.account.address;
                    Account2.publicKey = res.body.account.publicKey;
                    Account2.balance = res.body.account.balance;
                }
                else{
                    console.log('Unable to open account2, tests will fail');
                    console.log('Data sent: secret: ' + Account2.password + ' , secondSecret: ' + Account2.secondPassword );
                    node.expect("TEST").to.equal("FAILED");
                }
                done();
            });
    });

    before(function (done) {
        node.api.post('/accounts/open')
            .set('Accept', 'application/json')
            .send({
                secret: Account3.password,
                secondSecret: Account3.secondPassword
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                console.log('Opening Account 3 with password: ' + Account3.password);
                node.expect(res.body).to.have.property("success").to.be.true;
                if (res.body.success == true && res.body.account != null) {
                    Account3.address = res.body.account.address;
                    Account3.publicKey = res.body.account.publicKey;
                    Account3.balance = res.body.account.balance;
                }
                else{
                    console.log('Unable to open account3, tests will fail');
                    console.log('Data sent: secret: ' + Account3.password + ' , secondSecret: ' + Account3.secondPassword );
                    node.expect("TEST").to.equal("FAILED");
                }
                done();
            });
    });

    before(function (done) {
        // SEND XCR TO ACCOUNT 1 ADDRESS
        setTimeout(function() {
            randomXCR = node.randomizeXCR();
            node.api.put('/transactions')
                .set('Accept', 'application/json')
                .send({
                    secret: node.Faccount.password,
                    amount: randomXCR,
                    recipientId: Account1.address
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    if (res.body.success == true && res.body.transactionId != null) {
                        console.log('Sent to ' + Account1.address + ' ' + (randomXCR / node.normalizer) + ' XCR');
                        transactionCount += 1;
                        Account1.transactions.push(transactionCount);
                        Account1.balance += randomXCR;
                    }
                    else{
                        console.log("Sending XCR to Account1 failed.");
                        console.log("Sent: secret: " + node.Faccount.password + ", amount: " + randomXCR + ", recipientId: " + Account1.address );
                        node.expect("TEST").to.equal("FAILED");
                    }
                    done();
                });
        },2000);
    });

    before(function (done) {
        // SEND XCR TO ACCOUNT 2 ADDRESS
        setTimeout(function() {
            randomXCR = node.randomizeXCR();
            expectedFee = node.expectedFee(randomXCR);
            node.api.put('/transactions')
                .set('Accept', 'application/json')
                .send({
                    secret: node.Faccount.password,
                    amount: randomXCR,
                    recipientId: Account2.address
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    console.log('We send the XCR from foundation account to account. Recipient is: ' + Account2.address);
                    console.log('Sent to ' + Account2.address + ' ' + (randomXCR / node.normalizer) + ' XCR');
                    console.log('Expected fee (paid by sender): ' + expectedFee / node.normalizer + ' XCR');
                    node.expect(res.body).to.have.property("success").to.be.true;
                    if (res.body.success == true && res.body.transactionId != null) {
                        Account2.transactions.push(transactionCount);
                        transactionCount += 1;
                        totalTxFee += (expectedFee / node.normalizer);
                        Account2.balance += randomXCR;
                        transactionList[transactionCount - 1] = {
                            'sender': node.Faccount.address,
                            'recipient': Account2.address,
                            'brutoSent': (randomXCR + expectedFee) / node.normalizer,
                            'fee': expectedFee / node.normalizer,
                            'nettoSent': randomXCR / node.normalizer,
                            'txId': res.body.transactionId,
                            'type':node.TxTypes.SEND
                        }
                    }
                    else{
                        console.log("Sending XCR to Account2 failed.");
                        console.log("Sent: secret: " + node.Faccount.password + ", amount: " + randomXCR + ", recipientId: " + Account2.address );
                        node.expect("TEST").to.equal("FAILED");
                    }
                    done();
                    /*
                     console.log("Tx " + JSON.stringify(transactionList[transactionCount-1]));
                     console.log("Account: " + JSON.stringify(account));
                     console.log("Total Tx Fee: " + totalTxFee);
                     */
                });
        },2000);
    });

    before(function (done) {
        // Wait for new block to ensure all data has been received
        node.onNewBlock(function(err) {
            // Add 2nd password for Account 2
            node.api.put('/signatures')
                .set('Accept', 'application/json')
                .send({
                    secret: Account2.password,
                    secondSecret: Account2.secondPassword
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("transaction").that.is.an('object');
                });
        });
        console.log("ACCOUNT 1:" + Account1);
        console.log("ACCOUNT 2:" + Account2);
        console.log("ACCOUNT 3:" + Account3);
        done();

    });

    describe('Add DApp', function() {

        test += 1;
        it(test + '.Attempting to add DApp. Invalid secret. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: "justAR4nd0m Passw0rd",
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Invalid Category. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: "Choo Choo",
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Both SIA AND GIT. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon,
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. No Dapp name. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Very long description. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret:Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: node.DappAscii.app,
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Very long tag. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags:node.DappAscii.app,
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Very long name. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName() + node.randomDelegateName + node.randomDelegateName,
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. NO SIA, NO GIT. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Both SIA AND GIT. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: "justAR4nd0m Passw0rd",
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A dapp that should not be added",
                    tags: "Invalid,Wrong,Incorrect,Shouldn't work,Error Expected",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon,
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Valid SIA. 0 XCR account. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account3.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A SIA dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Valid SIA. Invalid 2nd password. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account2.password,
                    secondSecret: Account2.secondPassword + "1",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A SIA dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Valid SIA. Invalid Type. We expect error',function(done){
            siaDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: "INVALID TYPE",
                    name: siaDappName,
                    description: "A SIA dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add Dapp. Invalid Fields. We expect error',function(done){
            siaDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: "String",
                    type: "Type",
                    name: 1234,
                    description: 1234,
                    tags: 1234,
                    siaAscii:1234,
                    siaIcon:1234
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.error;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add Dapp. Valid SIA. We expect success',function(done){
            siaDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: siaDappName,
                    description: "A SIA dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    siaAscii:node.DappAscii.app,
                    siaIcon:node.DappAscii.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("transactionId");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add Dapp. Existing DAPP name (sia). We expect error',function(done){
            node.onNewBlock(function(err) {
                node.api.put('/dapps')
                    .set('Accept', 'application/json')
                    .send({
                        secret: Account1.password,
                        secondSecret: "",
                        category: node.randomProperty(node.DappCategory),
                        type: node.DappType.DAPP,
                        name: siaDappName,
                        description: "A SIA dapp which was added via API autotest",
                        tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                        siaAscii: node.DappAscii.app + "abc",
                        siaIcon: node.DappAscii.icon
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.false;
                        node.expect(res.body).to.have.property("error");
                        done();
                    });
            });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Existing ASCII Code. We expect error',function(done){
            node.onNewBlock(function(err) {
                node.api.put('/dapps')
                    .set('Accept', 'application/json')
                    .send({
                        secret: Account1.password,
                        secondSecret: "",
                        category: node.randomProperty(node.DappCategory),
                        type: node.DappType.DAPP,
                        name: node.randomDelegateName(),
                        description: "A SIA dapp which was added via API autotest",
                        tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                        siaAscii: node.DappAscii.app,
                        siaIcon: node.DappAscii.icon
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.false;
                        node.expect(res.body).to.have.property("error");
                        done();
                    });
            });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Via GIT. 0 XCR account. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account3.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A GIT dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Via GIT. Invalid 2nd password. We expect error',function(done){
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account2.password,
                    secondSecret: Account2.secondPassword + "1",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: node.randomDelegateName(),
                    description: "A GIT dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Via GIT. Invalid Type. We expect error',function(done){
            gitDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: "INVALIDTYPE",
                    name: gitDappName,
                    description: "A GIT dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Invalid Fields types. We expect error',function(done){
            gitDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: "Category",
                    type: "String",
                    name: 1234,
                    description: 1234,
                    tags: 1234,
                    git:1234,
                    icon:1234
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Valid GIT. We expect success',function(done){
            gitDappName = node.randomDelegateName();
            node.api.put('/dapps')
                .set('Accept', 'application/json')
                .send({
                    secret: Account1.password,
                    secondSecret:"",
                    category: node.randomProperty(node.DappCategory),
                    type: node.DappType.DAPP,
                    name: gitDappName,
                    description: "A GIT dapp which was added via API autotest",
                    tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                    git:node.DappGit.git,
                    icon:node.DappGit.icon
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("transactionId");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to add DApp. Existing Dapp name (git). We expect error',function(done){
            node.onNewBlock(function(err) {
                node.api.put('/dapps')
                    .set('Accept', 'application/json')
                    .send({
                        secret: Account1.password,
                        secondSecret: "",
                        category: node.randomProperty(node.DappCategory),
                        type: node.DappType.DAPP,
                        name: gitDappName,
                        description: "A GIT dapp which was added via API autotest",
                        tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                        git: "1" + node.DappGit.git,
                        icon: node.DappGit.icon
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.false;
                        done();
                    });
            });
        });


        test += 1;
        it(test + '.Attempting to add DApp. Existing GIT link. We expect error',function(done){
            node.onNewBlock(function(err) {
                node.api.put('/dapps')
                    .set('Accept', 'application/json')
                    .send({
                        secret: Account1.password,
                        secondSecret: "",
                        category: node.randomProperty(node.DappCategory),
                        type: node.DappType.DAPP,
                        name: node.randomDelegateName(),
                        description: "A GIT dapp which was added via API autotest",
                        tags: "API, api, 123, A123, a123, !@##$, ~~~!@#$%^&&**(, ,, aPI, Api, �, ����",
                        git:node.DappGit.git,
                        icon: node.DappGit.icon
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.false;
                        node.expect(res.body).to.have.property("error");
                        done();
                    });
            });
        });

    });

    describe('Get DApp', function() {

        test += 1;
        it(test + '. Get all Dapps. No limit. We expect success',function(done){
            var category = ""; var name = ""; var type = ""; var git = ""; var siaAscii = "";
            var siaIcon = ""; var icon = ""; var limit = ""; var offset = ""; var orderBy = "";
            node.onNewBlock(function(err) {
                node.api.get('/dapps')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.true;
                        node.expect(res.body).to.have.property("dapps").that.is.an('array');
                        if (res.body.success == true && res.body.dapps != null){
                            if((res.body.dapps).length > 0){
                                Dapp = res.body.dapps[0];
                                DappToInstall = Dapp;
                            }
                        }
                        else {
                            console.log(res.body);
                            console.log("Request failed or dapps array is null");
                        }
                        done();
                    });
            });
        });

        test += 1;
        it(test + '. Get all Dapps. Invalid Parameter types (git). We expect error',function(done){
            var category = "a category"; var name = 1234; var type = "type"; var git = 1234; var icon = 1234;
                node.api.get('/dapps?category=' + category + '&name=' + name + '&type=' + type + '&git=' + git + '&icon=' + icon)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.false;
                        node.expect(res.body).to.have.property("error");
                        done();
                    });
        });

        test += 1;
        it(test + '. Get all Dapps. Invalid Parameter types (sia). We expect error',function(done){
            var siaIcon = 1234; var siaAscii = 1234; var limit = "limitless"; var offset = "many"; var orderBy = 1234;
            node.api.get('/dapps?siaIcon=' + siaIcon + '&siaAscii=' + siaAscii + '&limit=' + limit + '&offset=' + offset + '&orderBy=' + orderBy)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Get all Dapps. Ascending order (category). We expect success',function(done){
            var orderBy = "category:asc";
            node.api.get('/dapps')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        if (res.body.dapps[0] != null){
                            for( var i = 0; i < res.body.dapps.length; i++){
                                if (res.body.dapps[i+1] != null){
                                    node.expect(res.body.dapps[i].category).to.be.at.most(res.body.dapps[i+1].category);
                                }
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get all Dapps. Descending order (category). We expect success',function(done){
            var orderBy = "category:desc";
            node.api.get('/dapps')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        if (res.body.dapps[0] != null){
                            for( var i = 0; i < res.body.dapps.length; i++){
                                if (res.body.dapps[i+1] != null){
                                    node.expect(res.body.dapps[i].category).to.be.at.least(res.body.dapps[i+1].category);
                                }
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get Dapps. Limited. We expect success',function(done){
            var limit = 3;
            node.api.get('/dapps?limit=50')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        node.expect((res.body.dapps).length).to.be.at.most(limit);
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get Dapps by category. We expect success',function(done){
            var randomCategory = node.randomProperty(node.DappCategory);
            node.api.get('/dapps?category=' + randomCategory)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        if((res.body.dapps).length > 0){
                            node.expect(res.body.dapps[0].category).to.equal(randomCategory);
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get Dapps by name. We expect success',function(done){
            var name = "";
            if (Dapp != {} && Dapp != null){
                name = Dapp.name;
            }
            else {
                name = "test";
            }
            node.api.get('/dapps?name=' + name)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    if (name == "test"){
                        node.expect(res.body).to.have.property("success");
                    }
                    else {
                        node.expect(res.body).to.have.property("success").to.be.true;
                        node.expect(res.body).to.have.property("dapps").that.is.an('array');
                        node.expect(res.body.dapps).length.to.equal(1);
                        if (res.body.success == true && res.body.dapps != null){
                            node.expect(res.body.dapps[0].name).to.equal(name);
                        }
                        else {
                            console.log(res.body);
                            console.log("Request failed or dapps array is null");
                        }
                    }
                    done()
                });
        });

        test += 1;
        it(test + '. Get Dapps by type. We expect success',function(done){
            var type = node.randomProperty(node.DappType);
            node.api.get('/dapps?type=' + type)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        for( var i = 0; i < res.body.dapps.length; i++){
                            if (res.body.dapps[i] != null){
                                node.expect(res.body.dapps[i].type).to.equal(type);
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get dapps by git. We expect success',function(done){
            var git = node.DappGit.git;
                node.api.get('/dapps?git=' + git)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        console.log(res.body);
                        node.expect(res.body).to.have.property("success").to.be.true;
                        node.expect(res.body).to.have.property("dapps").that.is.an('array');
                        if (res.body.success == true && res.body.dapps != null){
                            for( var i = 0; i < res.body.dapps.length; i++){
                                if (res.body.dapps[i] != null){
                                    node.expect(res.body.dapps[i].git).to.equal(git);
                                }
                            }
                        }
                        else {
                            console.log(res.body);
                            console.log("Request failed or dapps array is null");
                        }
                        done();
                    });
        });

        test += 1;
        it(test + '. Get dapps by git. We expect success',function(done){
            var git = node.DappGit.git;
            node.api.get('/dapps?git=' + git)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        var length = res.body.dapps.length;
                        node.expect(length).to.be.at.most(1);
                        for( var i = 0; i < length; i++){
                            if (res.body.dapps[i] != null){
                                node.expect(res.body.dapps[i].git).to.equal(git);
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get dapps by icon. We expect success',function(done){
            var icon = node.DappGit.icon;
            node.api.get('/dapps?icon=' + icon)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        for( var i = 0; i < res.body.dapps.length; i++){
                            if (res.body.dapps[i] != null){
                                node.expect(res.body.dapps[i].icon).to.equal(icon);
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get dapps by siaAscii. We expect success',function(done){
            var siaAscii = node.DappAscii.app;
            node.api.get('/dapps?siaAscii=' + siaAscii)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        var length = res.body.dapps.length;
                        node.expect(length).to.be.at.most(1);
                        for( var i = 0; i < length; i++){
                            if (res.body.dapps[i] != null){
                                node.expect(res.body.dapps[i].siaAscii).to.equal(siaAscii);
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get dapps by sia icon. We expect success',function(done){
            var siaIcon = node.DappAscii.icon;
            node.api.get('/dapps?siaIcon=' + siaIcon)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        for( var i = 0; i < res.body.dapps.length; i++){
                            if (res.body.dapps[i] != null){
                                node.expect(res.body.dapps[i].siaIcon).to.equal(siaIcon);
                            }
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get dapps using offset. We expect success',function(done){
            var offset = 1;
            var secondDApp;
            node.api.get('/dapps')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        if (res.body.dapps[1] != null){
                            secondDApp = res.body.dapps[1];
                            node.api.get('/dapps?offset=' + offset )
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function (err, res) {
                                    console.log(res.body);
                                    node.expect(res.body).to.have.property("success").to.be.true;
                                    if (res.body.success == true && res.body.dapps != null){
                                        node.expect(res.body.dapps[0].to.deep.equal(secondDApp));
                                    }
                                });
                        }
                        else {
                            console.log(res.body);
                            console.log("Only 1 dapp or something went wrong. cannot check offset");
                        }
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });
    });

    describe('Get DApp By ID', function() {

        test += 1;
        it(test + '. Get DApp by DApp ID. invalid ID. We expect error',function(done){
            var dappId = "string";
            node.api.get('/dapps/get?id=' + dappId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Get DApp by DApp ID. We do not send anything as ID parameter. We expect error',function(done){
            node.api.get('/dapps/get?id=')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Get DApp by DApp ID. valid ID. We expect success',function(done){
            var dappId = DappToInstall.transactionId;
            node.api.get('/dapps/get?id=' + dappId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapp");
                    if (res.body.success == true && res.body.dapp != null){
                        node.expect(res.body.dapp.transactionId).to.equal(dappId);
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

    });

    describe('Install DApp', function() {

        test += 1;
        it(test + '.Attempting to install DApp. No ID. We expect error',function(done){
            var dappId = DappToInstall.transactionId;
            node.api.post('/dapps/install')
                .set('Accept', 'application/json')
                .send({
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to install DApp. Invalid Type. We expect error',function(done){
            node.api.post('/dapps/install')
                .set('Accept', 'application/json')
                .send({
                    id: "DAPP ID"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to install DApp (and get InstallingID). Valid ID. We expect success',function(done){
            var dappId = DappToInstall.transactionId;
            node.api.post('/dapps/install')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    node.api.get('/dapps/installing')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            node.expect(res.body).to.have.property("success").to.be.true;
                            node.expect(res.body).to.have.property("installing").that.is.an('array');
                            if (res.body.success == true && res.body.installing != null){
                                node.expect(res.body.installing[0].transactionId).to.equal(dappId);
                            }
                            else {
                                console.log(res.body);
                                console.log("Request failed or installing array is null");
                            }
                        });
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("path");
                    if (res.body.success == true){
                        installedDapp = DappToInstall;
                    }
                    done();
                });
        });

    });

    describe('Get Installed DApps', function() {

        test += 1;
        it(test + '. Get all installed DApps. We expect success',function(done){
            var flag = 0;
            node.api.get('/dapps/installed')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    if (res.body.success == true && res.body.dapps != null){
                        for (var i = 0; i < res.body.dapps.length; i++){
                            if (res.body.dapps[i] != null){
                                if (res.body.dapps[i].transactionId == DappToInstall.transactionId) {
                                    flag += 1;
                                }
                            }
                        }
                        node.expect(flag).to.equal(1);
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

        test += 1;
        it(test + '. Get all installed DApps IDs. We expect success',function(done){
            var flag = 0;
            node.api.get('/dapps/installedIds')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("ids").that.is.an('array');
                    if (res.body.success == true && res.body.ids != null){
                        for (var i = 0; i < res.body.ids.length; i++){
                            if (res.body.ids[i] != null){
                                if (res.body.ids[i] == DappToInstall.transactionId) {
                                    flag += 1;
                                }
                            }
                        }
                        node.expect(flag).to.equal(1);
                    }
                    else {
                        console.log(res.body);
                        console.log("Request failed or dapps array is null");
                    }
                    done();
                });
        });

    });

    describe('Search DApps', function() {

        test += 1;
        it(test + '. Search Dapps. Invalid parameters. We expect error',function(done){
            var q = 1234; var category = "good"; var installed = "true";
            node.api.get('/dapps/search?q=' + q + '&category=' + category + '&installed=' + installed)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Search for Installed Dapps. We expect success',function(done){
            var q = "SELECT * DAPPS WHERE ID > 0"; var category = node.randomProperty(node.DappCategory); var installed = 1;
            node.api.get('/dapps/search?q=' + q + '&installed'+ installed)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    done();
                });
        });

        test += 1;
        it(test + '. Search for Dapps that are not installed. We expect success',function(done){
            var q = "SELECT * DAPPS WHERE ID > 0"; var category = node.randomProperty(node.DappCategory); var installed = 0;
            node.api.get('/dapps/search?q=' + q + '&installed'+ installed + '&category=' + category)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("dapps").that.is.an('array');
                    done();
                });
        });
    });

    describe('Launch DApp and get Launched DApps', function() {

        test += 1;
        it(test + '.Attempting to launch DApp. No ID. We expect error',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/launch')
                .set('Accept', 'application/json')
                .send({
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to launch DApp. Invalid Type. We expect error',function(done){
            var dappId = "HELLOW";
            node.api.post('/dapps/launch')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to launch DApp. Valid ID. We expect success',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/launch')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.api.get('/dapps/launched')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            console.log(res.body);
                            node.expect(res.body).to.have.property("success").to.be.true;
                            node.expect(res.body).to.have.property("launched").that.is.an('array');
                            if(res.body.success == true && res.body.launched != null){
                                var flag = 0;
                                for (var i = 0; i < res.body.launched.length; i++){
                                   if (res.body.launched[i] != null){
                                       if (res.body.launched[i] == dappId){
                                           flag += 1;
                                       }
                                   }
                                }
                                node.expect(flag).to.equal(1);
                            }
                            else {
                                console.log(res.body);
                                console.log("Request failed or launched array is null");
                            }
                        });
                    done();
                });
        });

    });

    describe('Stop DApp', function() {

        test += 1;
        it(test + '.Attempting to stop DApp. No ID. We expect error',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/stop')
                .set('Accept', 'application/json')
                .send({
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to stop DApp. Invalid Type. We expect error',function(done){
            var dappId = "HELLOW";
            node.api.post('/dapps/stop')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to stop DApp. Valid ID. We expect success',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/stop')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    done();
                });
        });

    });

    describe('Get DApps Categories', function() {

        test += 1;
        it(test + '. Get DApps categories. We expect success',function(done){
            node.api.get('/dapps/categories')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    node.expect(res.body).to.have.property("categories").that.is.an('object');
                    node.expect(res.body.categories).to.equal(node.DappCategory);
                    done();
                });
        });

    });

    describe('Get DApp icon from sia ', function() {

        test += 1;
        it(test + '. Get DApps icon from SIA. We send invalid ID. We expect error',function(done){
            var dappId = installedDapp.transactionId;
            node.api.get('/dapps/icon?id=0')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Get DApps icon from SIA. We do not send ID. We expect error',function(done){
            var dappId = installedDapp.transactionId;
            node.api.get('/dapps/icon?id=')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '. Get DApps icon from SIA. We send valid ID. We expect success',function(done){
            var dappId = installedDapp.transactionId;
            node.api.get('/dapps/icon?id=' + dappId)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    done();
                });
        });

    });

    describe('Uninstall DApp', function() {

        test += 1;
        it(test + '.Attempting to uninstall DApp. No ID. We expect error',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/uninstall')
                .set('Accept', 'application/json')
                .send({
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to uninstall DApp. Invalid Type. We expect error',function(done){
            node.api.post('/dapps/uninstall')
                .set('Accept', 'application/json')
                .send({
                    id: "DAPP ID"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.false;
                    node.expect(res.body).to.have.property("error");
                    done();
                });
        });

        test += 1;
        it(test + '.Attempting to uninstall DApp (and get UninstallingID). Valid ID. We expect success',function(done){
            var dappId = installedDapp.transactionId;
            node.api.post('/dapps/uninstall')
                .set('Accept', 'application/json')
                .send({
                    id: dappId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    node.api.get('/dapps/removing')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function (err, res) {
                            node.expect(res.body).to.have.property("success").to.be.true;
                            node.expect(res.body).to.have.property("removing").that.is.an('array');
                            if (res.body.success == true && res.body.removing != null){
                                node.expect(res.body.removing[0].transactionId).to.equal(dappId);
                            }
                            else {
                                console.log(res.body);
                                console.log("Request failed or installing array is null");
                            }
                        });
                    console.log(res.body);
                    node.expect(res.body).to.have.property("success").to.be.true;
                    done();
                });
        });

    });

    console.log("Finished Account-test suite");
});