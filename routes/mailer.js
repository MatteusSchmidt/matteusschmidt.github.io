require("dotenv").config();
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.APP_PASSWORD
    }
});

router.post("/", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        if (err) {
            console.log(err);
            res.status(500).send("Error parsing form data.");
            return;
        }
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });

        const mail = {
            from: data.name,
            to: process.env.GMAIL_SEND_TO,
            subject: data.subject,
            text: `${data.name} <${data.email}> \n${data.message}`,
        };

        transporter.sendMail(mail, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).json({ message: "Email successfully sent to recipient!" });
            }
        });
    });
});

module.exports = router;
