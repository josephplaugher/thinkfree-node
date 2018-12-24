const nodemailer = require('nodemailer');
const log = require('./../util/Logger');

const email = (user, req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'thinkfree.life@gmail.com', 
            pass: 'Edison1985!'
        }
    });
    let body = 'Hello ' + user.username + `,<br/><br/>
    Thank you for reading! I hope you'll join in the discussion.<br/><br/>
    If you want to subscribe to receive emails about new blog posts, just sign in and go to the user menu and click "Subscribe"<br/><br/>
    Friedman Smith`;
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Friedman Smith" <thinkfree.life@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Hello ' + user.username + ', Welcome To Think Free!', // Subject line
        text: body, // plain text body
        html: '<p>' + body + '</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            log(error, 'email.js')
        }
        res.status(200).json({email: 'message sent: ' + info})
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
};

module.exports = email;