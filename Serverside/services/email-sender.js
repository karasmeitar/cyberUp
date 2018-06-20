var env       = process.env.NODE_ENV || "development";
var path      = require("path");
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var fs        = require("fs");
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

var HtmlTemplate= function(callback){
    fs.readFile('C://Users//Administrator//Desktop//AngularUp//cyberUp//Serverside//public//assets//index.html','utf-8', function (err, data) {
        if (err) {
            callback(false);
        }
        callback(data);
    });
};


module.exports = {
    sendEmail: function(userToSend,callback) {
        HtmlTemplate(function(data){
            if(data) {

                var mailOptions = {
                    from: config.gmail_user,
                    to: userToSend.email,
                    subject: 'AngularUp 2018-CyberArk',
                    html: data.replace('{{fullname}}', userToSend.first_name + ' ' + userToSend.last_name).replace('{{code}}', userToSend.code)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                });
            }
        })
    },
}