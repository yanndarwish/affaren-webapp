import CryptoJS from "crypto-js"

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY

export const encryptData = (text) => {
	try {
		return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString()
	} catch (error) {
		console.error("Encryption error:", error)
		return ""
	}
}

export const decryptData = (encryptedText) => {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY)
		return bytes.toString(CryptoJS.enc.Utf8)
	} catch (error) {
		console.error("Decryption error:", error)
		return ""
	}
}

