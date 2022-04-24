const environment = process.env.NODE_ENV || 'development';

if (environment !== "production") {
  require("dotenv").config();
}

const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
    auth: {
        api_key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN,
        host: process.env.MAILGUN_HOST
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


module.exports.sendMail = (email, subject, text, cb) => {

            const mailOptions = {
                from: email,
                to: "lemotjustechat@outlook.com",
                subject: subject,
                text: text
            };
            transporter.sendMail(mailOptions, function(err, data) {
             if(data) {
               cb(null, data);
             } else {
               cb(err, null);
             }
          })
        
        };
