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
	if (req.body !== null && req.body.firstName !== null && req.body.lastName !== null && req.body.email !== null)
	{

		 models.Candidate.find({where: {first_name: req.body.firstName.trim().toLowerCase(),last_name:req.body.lastName.trim().toLowerCase()}})
            .then(function (Candidate) {
                if (Candidate) {
                    res.json({
                        status: 'error',
                        message: 'User exists !!!!'+ req.body.firstName
                    });
                    logger.info('User Exists'+JSON.stringify(Candidate));
                    return;
                }
                else
                {
                    code=code+5;
                    models.Candidate.create({
                        first_name: code,
                        last_name: req.body.lastName,
                        email:req.body.email,
                        code:code
                    }).then(function (CandidateRow) {
                        emailSender.sendEmail(CandidateRow,function(didWeSendEmail){
                            var returnMessage ='Please check your Email for your code!!';
                            var returnStatusCode = 'OK';
                            if(!didWeSendEmail){
                                returnMessage= 'We have some problems with the mailing server, please try again later';
                                returnStatusCode = 'ERROR'
                            }
                            res.json({
                                status: returnStatusCode,
                                message: returnMessage
                            });
                            logger.info('We send'+JSON.stringify(CandidateRow));
                            return;
                        })
                    }).catch(function (err) {
                        logger.error('We got error in add candidate s',err);
                        console.log(err);
                        callback(500, true);
                    });
                }
            });

	
	}
}

exports.GetCandidate =  function (req, res) {
    sequelize.query("SELECT * FROM `candidate` order by rand() limit 1", {type: Sequelize.QueryTypes.SELECT})
        .then(function (user) {
            if (user) {
                res.json({
                    status: 'ok',
                    message:  user
                });
                logger.info('The Winner is'+JSON.stringify(user));
                return;
            }
        })
}

