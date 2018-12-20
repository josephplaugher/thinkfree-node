const nodemailer = require('nodemailer');

const email = (user, req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'joseph@appreciateco.com', // generated ethereal user
            pass: 'Edison1985!' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Joseph Plaugher" <joseph@appreciateco.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Hello ' + user.username, // Subject line
        text: 'Hello ' + user.username, // plain text body
        html: '<b>Hello ' + user.username + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           // return console.log(error);
        }
        //console.log('Message sent: %s', info.messageId);
        res.status(200).json({email: 'message sent: ' + info})
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
};

module.exports = email;