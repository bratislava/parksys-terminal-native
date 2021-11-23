import MockAdapter from 'axios-mock-adapter/types'
import udrMock from './udr.mock'

/**
 * Add all mocks
 */
const rootMock: ((mock: MockAdapter) => Record<string, MockAdapter>)[] = [
  udrMock,
]

/**
 * Register all mocks from rootMock
 * @param mockInstance mock instance to register mocks
 */
export function registerPricingMocks(mockInstance: MockAdapter) {
  for (const mock of rootMock) {
    mock(mockInstance)
  }
}
