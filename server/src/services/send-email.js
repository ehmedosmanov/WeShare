import nodemailer from 'nodemailer'

const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  }

  return transporter.sendMail(mailOptions)
}

export default sendMail
