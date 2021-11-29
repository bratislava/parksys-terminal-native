import MockAdapter from 'axios-mock-adapter/types'
import { ZonedDateTime, ChronoUnit } from '@js-joda/core'

function calculatePrice(duration: number, zone: string) {
  return duration <= 0 ? 2 : duration * Number(zone)
}

const priceMock = (mock: MockAdapter): Record<string, MockAdapter> => ({
  getPrice: mock.onPost('/api/ecvparking/charging').reply(async (config) => {
    const { parkingEnd, udr } = JSON.parse(config.data)

    const parkingEndDate = ZonedDateTime.parse(parkingEnd)
    const durationHours = ZonedDateTime.now().until(
      parkingEndDate,
      ChronoUnit.HOURS
    )

    const data = {
      ticketStart: new Date().toISOString(),
      ticketEnd: parkingEnd,
      creditBPKUsed: 'P2H',
      creditBPKRemaining: 'P2H',
      priceTotal: calculatePrice(durationHours, udr),
      priceWithoutDiscount: 0,
      priceBreakdown: [
        {
          creditUsed: 'P2H',
          price: 0,
          tariffIntervalDetail: {
            tariffStart: 'string',
            tariffEnd: 'string',
            timeInTariff: 'P2H',
            tariffPrice: 0,
            parkingLimit: 'P2H',
          },
        },
      ],
      cardInfo: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          cardSchemeGroupName: 'string',
        },
      ],
    }

    return [200, data]
  }),
})

export default priceMock
