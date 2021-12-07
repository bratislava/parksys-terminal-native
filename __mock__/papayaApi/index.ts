import MockAdapter from 'axios-mock-adapter/types'
import getReceiptMock from './getReceipt.mock'
import printMock from './print.mock'
import setupTerminalMock from './setupTerminal.mock'

/**
 * Add all mocks
 */
const rootMock: ((mock: MockAdapter) => Record<string, MockAdapter>)[] = [
  printMock,
  getReceiptMock,
  setupTerminalMock,
]

/**
 * Register all mocks from rootMock
 * @param mockInstance mock instance to register mocks
 */
export function registerPapayaMocks(mockInstance: MockAdapter) {
  for (const mock of rootMock) {
    mock(mockInstance)
  }
}
