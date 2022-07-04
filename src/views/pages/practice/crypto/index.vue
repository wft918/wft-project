<template>
  <div class="crypto-js"> 
    <span>crypto-js</span>
  </div>
</template>
<script>
import { encryption, decrypt } from '@/utils/crypto'
export default {
  data() {
    return {

    }
  },
  mounted(){
    let pwd = '17171711717'
    let key = 'abcdef0123456789'
    let iv = 'abcdef0123456789'
    console.log(encryption(pwd, key, iv), '加密----->>>') // 加密
    console.log(decrypt(encryption(pwd, key, iv), key, iv), '解密----->>>') // 解密
  },
  methods:{
    // init() {
    //   // parse
    //   var wordArray = CryptoJS.enc.Utf8.parse(utf8String)
    //   var wordArray = CryptoJS.enc.Latin1.parse(latin1String)
    //   var wordArray = CryptoJS.enc.Hex.parse(hexString)
    //   var wordArray = CryptoJS.enc.Base64.parse(base64String)
    //   // stringfiy
    //   var utf8String = CryptoJS.enc.Utf8.stringify(utf8Array)
    //   var latin1String = CryptoJS.enc.Latin1.stringify(Latin1Array)
    //   var hexString = CryptoJS.enc.Hex.stringify(HexArray)
    //   var base64String = CryptoJS.enc.Base64.stringify(Base64Array)


    //   // 消息摘要算法
    //   var hash = CryptoJS.MD5(message)
    //   var hash = CryptoJS.MD5(wordArray)
    //   var hmac = CryptoJS.HmacMD5(message, key)

    //   var hash = CryptoJS.SHA1(message)
    //   var hash = CryptoJS.SHA1(wordArray)
    //   var hmac = CryptoJS.HmacSHA1(message, key)

    //   var hash = CryptoJS.SHA224(message)
    //   var hash = CryptoJS.SHA224(wordArray)
    //   var hmac = CryptoJS.HmacSHA224(message, key)

    //   var hash = CryptoJS.SHA256(message)
    //   var hash = CryptoJS.SHA256(wordArray)
    //   var hmac = CryptoJS.HmacSHA256(message, key)

    //   var hash = CryptoJS.SHA3(message)
    //   var hash = CryptoJS.SHA3(wordArray)
    //   var hmac = CryptoJS.HmacSHA3(message, key)

    //   var hash = CryptoJS.SHA384(message)
    //   var hash = CryptoJS.SHA384(wordArray)
    //   var hmac = CryptoJS.HmacSHA384(message, key)

    //   var hash = CryptoJS.SHA512(message)
    //   var hash = CryptoJS.SHA512(wordArray)
    //   var hmac = CryptoJS.HmacSHA512(message, key)

    //   // 对称加密算法
    //   var ciphertext = CryptoJS.AES.encrypt(message, key, config)
    //   var plaintext = CryptoJS.AES.decrypt(ciphertext, key, config)

    //   var ciphertext = CryptoJS.DES.encrypt(message, key, config)
    //   var plaintext = CryptoJS.DES.decrypt(ciphertext, key, config)

    //   var ciphertext = CryptoJS.TripleDES.encrypt(message, key, config)
    //   var plaintext = CryptoJS.TripleDES.decrypt(ciphertext, key, config)

    //   var ciphertext = CryptoJS.RC4.encrypt(message, key, config)
    //   var plaintext = CryptoJS.RC4.decrypt(ciphertext, key, config)

    //   // 加密模式
    //   mode: // CBC ECB CFB OFB CTRGladman(CTR)
    //   // 填充方式
    //   padding: // NoPadding ZeroPadding Pkcs7(Pkcs5) Iso10126 Iso97971 AnsiX923
    // }
  },
}
</script>
<style scoped>
.crypto-js {
  width: 100%;
  height: 100%;
}
</style>
