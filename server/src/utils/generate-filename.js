import crypto from 'crypto'
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')

export default generateFileName
