import { OTP } from 'otplib'
import crypto from 'crypto'
import type { Role } from '@/types'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12

function getEncryptionKey(): Buffer {
  const key = process.env.MFA_ENCRYPTION_KEY
  if (!key || key.length !== 64) {
    throw new Error('MFA_ENCRYPTION_KEY must be a 64-character hex string (256 bits)')
  }
  return Buffer.from(key, 'hex')
}

export function encryptSecret(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted.toString('base64')}`
}

export function decryptSecret(encrypted: string): string {
  const key = getEncryptionKey()
  const [ivB64, authTagB64, ciphertextB64] = encrypted.split(':')

  const iv = Buffer.from(ivB64, 'base64')
  const authTag = Buffer.from(authTagB64, 'base64')
  const ciphertext = Buffer.from(ciphertextB64, 'base64')

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(authTag)

  return decipher.update(ciphertext).toString('utf8') + decipher.final('utf8')
}

const otp = new OTP()

export function generateMfaSecret(): string {
  return otp.generateSecret()
}

export async function verifyTotp(secret: string, token: string): Promise<boolean> {
  const result = await otp.verify({ secret, token })
  return result.valid
}

export function generateQrCodeUri(email: string, secret: string): string {
  return otp.generateURI({
    secret,
    label: email,
    issuer: 'Sundara Admin',
  })
}

export function requiresMfa(role: Role): boolean {
  return role !== 'checkin'
}
