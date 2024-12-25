import crypto from 'crypto-js'
const getIV = () => crypto.enc.Hex.parse(process.env.NEXT_PUBLIC_KEY_IV_ENCODE!)

export const encryptData = (value: string | object, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    return crypto.AES.encrypt(JSON.stringify(value), crypto.enc.Utf8.parse(pinCode), {
      iv: getIV(),
    }).toString()
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: any, pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT) => {
  try {
    const bytes = crypto.AES.decrypt(value.toString(), crypto.enc.Utf8.parse(pinCode), {
      iv: getIV(),
    })

    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8))
    return decryptedData
  } catch (error) {
    return ''
  }
}

export const encodeDataMaxLength = (
  value: string | object,
  maxLength = 42,
  pinCode: string = process.env.NEXT_PUBLIC_KEY_SALT,
) => {
  try {
    const stringEncode = encryptData(value, pinCode)
    if (stringEncode.length < 43) {
      return stringEncode
    }
    return stringEncode.substr(0, maxLength)
  } catch (error) {
    return ''
  }
}
