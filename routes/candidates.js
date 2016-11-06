var request = require('request');
var models = require('../models');
var code =5;

exports.AddCandidate = function (req, res) {
	if (req.body !== null && req.body.firstName !== null && req.body.lastName !== null && req.body.email !== null)
	{

		 models.Candidate.find({where: {first_name: req.body.firstName,last_name: req.body.lastName,email: req.body.email}})
            .then(function (Candidate) {
                if (Candidate) {
                    res.json({
                        status: 'error',
                        message: 'We have already this User'
                    });
                    return;
                }
                else
                {
                    code=code+5;
                    models.Candidate.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email:req.body.email,
                        code:code
                    }).then(function (CandidateRow) {
                        res.json({
                            status: 'ok',
                            message: code
                        });
                        return;
                    }).catch(function (err) {
                        console.log(err);
                        callback(500, true);
                    });
                }
            });

	
	}
}

