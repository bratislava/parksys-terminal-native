import MockAdapter from 'axios-mock-adapter/types'

const setupTerminalMock = (mock: MockAdapter): Record<string, MockAdapter> => ({
  setupTerminal: mock.onPost('/api/setup').reply(async (config) => {
    const body = JSON.parse(config.data)
    return [200, body]
  }),
})

export default setupTerminalMock
