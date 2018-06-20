var request = require('request');
var models = require('../models');
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var path      = require("path");
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var code =5;
var emailSender = require('../services/email-sender');
var logger = require('./../logger');

exports.AddCandidate = function (req, res) {
	if (req.body !== null && req.body.firstName !== null && module.exports.validateName(req.body.firstName) && module.exports.validateName(req.body.lastName) && req.body.lastName !== null && req.body.email !== null)
	{
        var condition = {
            where:  Sequelize.and(
                { first_name: req.body.firstName.trim().toLowerCase()},
                {last_name:req.body.lastName.trim().toLowerCase()},
                {email:req.body.email.trim()})};

		 models.Candidate.find(condition)
            .then(function (Candidate) {
                if (Candidate) {
                    res.json({
                        status: 409,
                        message: 'User ' + req.body.firstName + ' already exists.'
                    });
                    logger.info('User Exists' + JSON.stringify(Candidate));
                    return;
                }
                else {
                    models.Candidate.find({where:{email: req.body.email.trim()}})
                        .then(function (Candidate) {
                            if (Candidate) {
                                res.json({
                                    status: 409,
                                    message: req.body.email + ' already exists.'
                                });
                                logger.info('User Exists' + JSON.stringify(Candidate));
                                return;
                            }
                            else {
                                code = module.exports.GenerateGuid();
                                models.Candidate.create({
                                    first_name: req.body.firstName,
                                    last_name: req.body.lastName,
                                    email: req.body.email,
                                    code: code
                                }).then(function (CandidateRow) {
                                    emailSender.sendEmail(CandidateRow, function (didWeSendEmail) {
                                        var returnStatusCode = 201;
                                        var returnMessage = '';
                                        if (!didWeSendEmail) {
                                            returnMessage = 'We have some problems with the mailing server, please try again later';
                                            returnStatusCode = 500
                                        }
                                        res.json({
                                            status: returnStatusCode,
                                            message: returnMessage
                                        });
                                        logger.info('We send' + JSON.stringify(CandidateRow));
                                        return;
                                    })
                                }).catch(function (err) {
                                    logger.error('We got error in add candidate', err);
                                    console.log(err);
                                    callback(500, true);
                                });
                            }

                        });
                }
            })
	}
	else{
	    res.json({
	        status: 400,
            message:'Only English letters are supported'
        })
    }
}

exports.GenerateGuid =  function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4();
}

exports.GetCandidate =  function (req, res) {
    sequelize.query("SELECT * FROM `candidate` order by rand() limit 1", {type: Sequelize.QueryTypes.SELECT})
        .then(function (user) {
            if (user) {
                res.json({
                    status: 201,
                    message:  user
                });
                logger.info('The Winner is'+JSON.stringify(user));
                return;
            }
        })
}

exports.validateName =  function(inputtxt)
{
    if (/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(inputtxt)) {
        return true;
    }
    return false;
}

