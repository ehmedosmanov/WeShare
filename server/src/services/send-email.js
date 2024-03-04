import nodemailer from 'nodemailer'

const sendMail = async (to, subject, html) => {
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
    html
  }

  return transporter.sendMail(mailOptions)
}

export default sendMail
