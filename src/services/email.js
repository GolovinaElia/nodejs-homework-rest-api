const nodemailer = require("nodemailer")
require("dotenv").config()

const config = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
}
const transporter = nodemailer.createTransport(config)

class EmailService {
  async sendEmail(verifyToken, email) {
    const emailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verificate email",
      text: "Dear user! Click on the link in the message to access the site",
      html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Click to confirm email</a>`,
    }

    try {
      const result = await transporter.sendMail(emailOptions)
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = EmailService
