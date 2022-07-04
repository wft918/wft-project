
import CryptoJS from "crypto-js";

// 加密
export function encryption(pwd, key, iv) {
  pwd = CryptoJS.enc.Utf8.parse(pwd) // 解析明文
  key = CryptoJS.enc.Utf8.parse(key) // 解析密钥
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(pwd, key, {
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
    iv // 向量
  })
  return encrypted.toString() // 加密后的结果是对象，要转为文本

  // 加上ciphertext 就变成十六进制的了
  // return encrypted.ciphertext.toString()
}

// 解密
export function decrypt(data, key, iv) {
  // // 如果加密时候用了ciphertext.toString() 就得加上下面这两行
  // data = CryptoJS.enc.Hex.parse(data)
  // data = CryptoJS.enc.Base64.stringify(data)
  key = CryptoJS.enc.Utf8.parse(key) // 解析密钥
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.decrypt(data, key, {  // 解析的密文必须是base64编码（data） 很关键！
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
    iv // 向量
  })
  return encrypted.toString(CryptoJS.enc.Utf8) // 加密后的结果是对象，要转为文本
}