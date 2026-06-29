import { AES, enc } from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY as string

export function encrypt<T>(data: T): string {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export function decrypt<T>(data: string): T {
  const bytes = AES.decrypt(data, SECRET_KEY)
  return JSON.parse(bytes.toString(enc.Utf8)) as T
}
