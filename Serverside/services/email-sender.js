var env       = process.env.NODE_ENV || "development";
var path      = require("path");
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');




var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth: {
        user: config.gmail_user,
        pass: config.gmail_pass
    }
}));


module.exports = {
    sendEmail: function(userToSend,callback) {
        console.log(config.gmail_user);
        var mailOptions = {
            from: config.gmail_user,
            to: userToSend.email,
            subject: 'AngularUp 2018-CyberArk',
            text: 'Hello ' + userToSend.first_name + ' ' + userToSend.last_name
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                callback(false);
            } else {
                console.log('Email sent: ' + info.response);
                callback(true);
            }
        });
    }
}