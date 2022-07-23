const nodemailer = require('nodemailer');

async function sendEmail(userName, userEmail) {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'goit_teacher@outlook.com', // generated ethereal user
        pass: 'Qwe123456goit', // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const output = `<h2>Hello</h2>
    <p>You have new email from ${userName}</p>
    <p>Send you answer ${userEmail}</p>`;

    const emailOptions = {
      from: '"Fred Foo 👻" goit_teacher@outlook.com', // sender address
      to: 'rabbitskroll@gmail.com', // list of receivers
      subject: 'Hello from node.js server', // Subject line
      text: 'New message', // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(emailOptions);

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return true;
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
