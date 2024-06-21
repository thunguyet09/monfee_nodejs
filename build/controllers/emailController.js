const nodemailer = require("nodemailer");
class emailController {
  async sendEmail(to, subject, text, html) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "thnguyet03@gmail.com",
        pass: "dykw zmra kbrb wbta"
      }
    });
    const mailOptions = {
      from: "thnguyet03@gmail.com",
      to,
      subject,
      text,
      html
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
module.exports = new emailController();