import MockAdapter from 'axios-mock-adapter/types'

const printMock = (mock: MockAdapter): Record<string, MockAdapter> => ({
  postPrint: mock.onPost('/api/print').reply(async (config) => {
    const { printData, printer } = JSON.parse(config.data)
    return [
      200,
      {
        rawData: printData,
      },
    ]
  }),
})

export default printMock
