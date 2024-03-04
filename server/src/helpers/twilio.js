import twilio from 'twilio'

const accountSid = 'ACbe21a24f0e9dfe15e45061a3bc8663a4'
const authToken = 'a14394314a0278e75fbf35c0f453a26f'
const verifySid = 'VAf8bf6acaef122421b522671e6dfabed9'
const client = twilio(accountSid, authToken)
const verifyService = client.verify.v2.services(verifySid)

export async function startTwoFactorAuthentication(phoneNumber) {
  try {
    const verification = await verifyService.verifications.create({
      to: phoneNumber,
      channel: 'sms'
    })

    console.log(verification.status)
  } catch (error) {
    console.error('Ошибка при запуске двухфакторной аутентификации:', error)
  }
}

export async function verifyOTP(phoneNumber, otpCode) {
  try {
    const verification_check = await verifyService.verificationChecks.create({
      to: phoneNumber,
      code: otpCode
    })

    console.log(verification_check.status)
  } catch (error) {
    console.error('Ошибка при проверке OTP-кода:', error)
  }
}
