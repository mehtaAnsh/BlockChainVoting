const VoterModel = require('../models/voter');

const bcrypt = require('bcrypt');

const path = require('path');

var nodemailer = require('nodemailer');

const saltRounds = 10;

module.exports = {
	create: function (req, res, cb) {
		VoterModel.findOne(
			{ email: req.body.email, election_address: req.body.election_address },
			function (err, result) {
				if (err) {
					cb(err);
				} else {
					if (!result) {
						VoterModel.create(
							{
								email: req.body.email,
								password: req.body.email,
								election_address: req.body.election_address,
							},
							function (err, voter) {
								if (err) cb(err);
								else {
									console.log(voter);

									console.log(voter.email);

									console.log(req.body.election_description);

									console.log(req.body.election_name);

									var transporter = nodemailer.createTransport({
										service: 'gmail',

										auth: {
											user: process.env.EMAIL,

											pass: process.env.PASSWORD,
										},
									});

									const mailOptions = {
										from: process.env.EMAIL, // sender address

										to: voter.email, // list of receivers

										subject: req.body.election_name, // Subject line

										html:
											req.body.election_description +
											'<br>Your voting id is:' +
											voter.email +
											'<br>' +
											'Your password is:' +
											voter.password +
											'<br><a href="http://localhost:3000/homepage">Click here to visit the website</a>', // plain text body
									};

									transporter.sendMail(mailOptions, function (err, info) {
										if (err) {
											res.json({
												status: 'error',
												message: 'Voter could not be added',
												data: null,
											});

											console.log(err);
										} else {
											console.log(info);

											res.json({
												status: 'success',
												message: 'Voter added successfully!!!',
												data: null,
											});
										}
									});
								}
							}
						);
					} else {
						res.json({ status: 'error', message: 'Voter already exists ', data: null });
					}
				}
			}
		);
	},

	authenticate: function (req, res, cb) {
		VoterModel.findOne({ email: req.body.email, password: req.body.password }, function (err, voterInfo) {
			if (err) cb(err);
			else {
				if (voterInfo)
					res.json({
						status: 'success',
						message: 'voter found!!!',
						data: { id: voterInfo._id, election_address: voterInfo.election_address },
					});
				//res.sendFile(path.join(__dirname+'/index.html'));
				else {
					res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
				}
			}
		});
	},

	getAll: function (req, res, cb) {
		let voterList = [];

		VoterModel.find({ election_address: req.body.election_address }, function (err, voters) {
			if (err) cb(err);
			else {
				for (let voter of voters) voterList.push({ id: voter._id, email: voter.email });

				count = voterList.length;

				res.json({
					status: 'success',
					message: 'voters list found!!!',
					data: { voters: voterList },
					count: count,
				});
			}
		});
	},

	updateById: function (req, res, cb) {
		VoterModel.findOne({ email: req.body.email }, function (err, result) {
			if (err) {
				cb(err);
			} else {
				console.log('email:' + req.body.email);
				console.log('findOne:' + result);
				if (!result) {
					password = bcrypt.hashSync(req.body.email, saltRounds);
					console.log('email not found');
					console.log('voterID:' + req.params.voterId);
					VoterModel.findByIdAndUpdate(
						req.params.voterId,
						{ email: req.body.email, password: password },
						function (err, voter) {
							if (err) cb(err);
							console.log('update method object:' + voter);
						}
					);
					VoterModel.findById(req.params.voterId, function (err, voterInfo) {
						if (err) cb(err);
						else {
							console.log('Inside find after update' + voterInfo);
							var transporter = nodemailer.createTransport({
								service: 'gmail',
								auth: {
									user: process.env.EMAIL,
									pass: process.env.PASSWORD,
								},
							});
							const mailOptions = {
								from: process.env.EMAIL, // sender address
								to: voterInfo.email, // list of receivers
								subject: req.body.election_name, // Subject line
								html:
									req.body.election_description +
									'<br>Your voting id is:' +
									voterInfo.email +
									'<br>' +
									'Your password is:' +
									voterInfo.password +
									'<br><a href="url">Click here to visit the website</a>', // plain text body
							};
							transporter.sendMail(mailOptions, function (err, info) {
								if (err) {
									res.json({ status: 'error', message: 'Voter could not be added', data: null });
									console.log(err);
								} else {
									console.log(info);
									res.json({
										status: 'success',
										message: 'Voter updated successfully!!!',
										data: null,
									});
								}
							});
						}
					});
				} else {
					res.json({ status: 'error', message: 'Voter already exists ', data: null });
				}
			}
		});
	},

	deleteById: function (req, res, cb) {
		VoterModel.findByIdAndRemove(req.params.voterId, function (err, voterInfo) {
			if (err) cb(err);
			else {
				res.json({ status: 'success', message: 'voter deleted successfully!!!', data: null });
			}
		});
	},

	resultMail: function (req, res, cb) {
		VoterModel.find({ election_address: req.body.election_address }, function (err, voters) {
			if (err) cb(err);
			else {
				const election_name = req.body.election_name;

				const winner_candidate = req.body.winner_candidate;

				for (let voter of voters) {
					var transporter = nodemailer.createTransport({
						service: 'gmail',

						auth: {
							user: process.env.EMAIL,

							pass: process.env.PASSWORD,
						},
					});

					const mailOptions = {
						from: process.env.EMAIL, // sender address

						to: voter.email, // list of receivers

						subject: election_name + ' results', // Subject line

						html:
							'The results of ' +
							election_name +
							' are out.<br>The winner candidate is: <b>' +
							winner_candidate +
							'</b>.',
					};

					transporter.sendMail(mailOptions, function (err, info) {
						if (err) {
							res.json({ status: 'error', message: 'mail error', data: null });

							console.log(err);
						} else console.log(info);

						res.json({ status: 'success', message: 'mails sent successfully!!!', data: null });
					});
				}

				var transporter = nodemailer.createTransport({
					service: 'gmail',

					auth: {
						user: process.env.EMAIL,

						pass: process.env.PASSWORD,
					},
				});

				const mailOptions = {
					from: process.env.EMAIL, // sender address

					to: req.body.candidate_email, // list of receivers

					subject: req.body.election_name + ' results !!!', // Subject line

					html: 'Congratulations you won ' + req.body.election_name + ' election.', // plain text body
				};

				transporter.sendMail(mailOptions, function (err, info) {
					if (err) {
						res.json({ status: 'error', message: 'mail error', data: null });

						console.log(err);
					} else console.log(info);

					res.json({ status: 'success', message: 'mail sent successfully!!!', data: null });
				});
			}
		});
	},
};
