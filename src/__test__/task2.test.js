import { decodeFromBase64, decodeFromHex, encodeToBase64, encodeToHex } from '../main.js'

let originalConsoleError // Визначаємо змінну в області видимості, доступній для обох хуків
let originalConsoleLog // Визначаємо змінну в області видимості, доступній для обох хуків

// Мокуємо `fetch` глобально за допомогою jest
beforeEach(() => {
  jest.resetAllMocks()
  originalConsoleError = console.error // Зберігаємо оригінальний console.error
  originalConsoleLog = console.log // Зберігаємо оригінальний console.log
  console.error = jest.fn() // Приглушаємо console.error
  console.log = jest.fn() // Приглушаємо console.log
  global.fetch = jest.fn()
})

afterEach(() => {
  console.error = originalConsoleError // Відновлюємо console.error
  console.log = originalConsoleLog // Відновлюємо console.log
})

describe('Encoder and Decoder Functions', () => {
  test('encodeToBase64 correctly encodes multiple arguments', () => {
    const result = encodeToBase64('hello', 'world')
    expect(result).toBe(Buffer.from('hello:world').toString('base64'))
  })

  test('encodeToHex correctly encodes multiple arguments', () => {
    const result = encodeToHex('hello', 'world')
    expect(result).toBe(Buffer.from('hello:world').toString('hex'))
  })

  test('decodeFromBase64 correctly decodes a base64 string', () => {
    const base64String = Buffer.from('hello:world').toString('base64')
    const result = decodeFromBase64(base64String)
    expect(result).toBe('hello:world')
  })

  test('decodeFromHex correctly decodes a hex string', () => {
    const hexString = Buffer.from('hello:world').toString('hex')
    const result = decodeFromHex(hexString)
    expect(result).toBe('hello:world')
  })
})
