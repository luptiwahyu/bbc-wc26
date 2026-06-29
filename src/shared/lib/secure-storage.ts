import { decrypt, encrypt } from './encryption'

interface SecureStorageOptions {
  prefix?: string
}

export default class SecureStorage {
  private prefix: string

  constructor(options?: SecureStorageOptions) {
    this.prefix = options?.prefix || ''
  }

  private getPrefixedKey = (key: string): string => {
    return this.prefix + key
  }

  public set = <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return

    const prefixedKey = this.getPrefixedKey(key)
    const encryptedValue = encrypt(value)
    localStorage.setItem(prefixedKey, encryptedValue)
  }

  public get = <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null

    const prefixedKey = this.getPrefixedKey(key)
    const encryptedValue = localStorage.getItem(prefixedKey)
    if (!encryptedValue) return null

    try {
      return decrypt(encryptedValue)
    } catch (error) {
      console.error('Error decrypting data ', error)
      return null
    }
  }

  public remove = (key: string): void => {
    if (typeof window === 'undefined') return

    const prefixedKey = this.getPrefixedKey(key)
    localStorage.removeItem(prefixedKey)
  }

  public clear = (): void => {
    if (typeof window === 'undefined') return

    localStorage.clear()
  }

  public clearByPrefix = (): void => {
    if (typeof window === 'undefined') return

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key)
      }
    })
  }
}
