import { isDebugMode } from '../main.js'

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

describe('isDebugMode', () => {
  it('should return true if NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development'
    expect(isDebugMode()).toBe(true)
  })

  it('should return false if NODE_ENV is not development', () => {
    process.env.NODE_ENV = 'production'
    expect(isDebugMode()).toBe(false)
  })
})
