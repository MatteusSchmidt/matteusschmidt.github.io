require("dotenv").config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.APP_PASSWORD
    }
});

const form = document.getElementById('email-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
})

const sendMail = (mail) => {
    fetch("/send", {
        method: "post",
        body: mail,

    }).then((response) => {
        return response.json();
    });
};