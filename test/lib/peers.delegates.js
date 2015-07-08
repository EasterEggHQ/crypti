var node = require('./../variables.js'),
	crypto = require('crypto');

var account = node.randomAccount();
var account2 = node.randomAccount();

describe("Peers delegates transactions", function () {
	it("Create delegate with incorrect username. Should return not ok", function (done) {
		node.api.post('/accounts/open')
			.set('Accept', 'application/json')
			.send({
				secret: account.password
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				account.address = res.body.account.address;
				node.api.put('/transactions')
					.set('Accept', 'application/json')
					.send({
						secret: node.peers_config.account,
						amount: 100000000000,
						recipientId: account.address
					})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function (err, res) {
						node.onNewBlock(function (err) {
							node.expect(err).to.be.not.ok;
							var transaction = node.crypti.delegate.createDelegate(account.password, crypto.randomBytes(64).toString('hex'));
							node.peer.post('/transactions')
								.set('Accept', 'application/json')
								.send({
									transaction: transaction
								})
								.expect('Content-Type', /json/)
								.expect(200)
								.end(function (err, res) {
									//console.log(res.body);
									node.expect(res.body).to.have.property("success").to.be.false;
									done();
								});
						});
					});
			});
	});

	it("Create delegate from account with no funds. Should return not ok", function (done) {
		var transaction = node.crypti.delegate.createDelegate(node.randomPassword(), node.randomDelegateName());
		node.peer.post('/transactions')
			.set('Accept', 'application/json')
			.send({
				transaction: transaction
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				//console.log(res.body);
				node.expect(res.body).to.have.property("success").to.be.false;
				done();
			});
	});

	it("Create delegate on acccount. Should return ok", function (done) {
		account.username = node.randomDelegateName();
		var transaction = node.crypti.delegate.createDelegate(account.password, account.username);
		node.peer.post('/transactions')
			.set('Accept', 'application/json')
			.send({
				transaction: transaction
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				//console.log(res.body);
				node.expect(res.body).to.have.property("success").to.be.true;
				done();
			});
	});

	it("Create delegate on new account and then create it again in one block", function (done) {
		node.api.post('/accounts/open')
			.set('Accept', 'application/json')
			.send({
				secret: account2.password
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				account2.address = res.body.account.address;
				node.api.put('/transactions')
					.set('Accept', 'application/json')
					.send({
						secret: node.peers_config.account,
						amount: 100000000000,
						recipientId: account2.address
					})
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function (err, res) {
						node.onNewBlock(function (err) {
							node.expect(err).to.be.not.ok;
							account2.username = node.randomDelegateName();
							var transaction = node.crypti.delegate.createDelegate(account2.password, account2.username);
							node.peer.post('/transactions')
								.set('Accept', 'application/json')
								.send({
									transaction: transaction
								})
								.expect('Content-Type', /json/)
								.expect(200)
								.end(function (err, res) {
									node.expect(res.body).to.have.property("success").to.be.true;

									account2.username = node.randomDelegateName();
									var transaction2 = node.crypti.delegate.createDelegate(account2.password, account2.username);

									node.peer.post('/transactions')
										.set('Accept', 'application/json')
										.send({
											transaction: transaction2
										})
										.expect('Content-Type', /json/)
										.expect(200)
										.end(function (err, res) {
											//console.log(res.body);
											node.expect(res.body).to.have.property("success").to.be.false;
											done();
										});
								});
						});
					});
			});
	});
});