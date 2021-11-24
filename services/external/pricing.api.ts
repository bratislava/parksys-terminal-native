import pricingApi from '@lib/api/pricingApi'
import {
  TParkingPriceReqData,
  IParkinPriceResData,
} from '@models/pricing/parkingPrice/parkingPrice.d'
import {
  getPriceReqValidation,
  getPriceResValidation,
} from '@models/pricing/parkingPrice/parkingPrice.schema'
import { TudrResData } from '@models/pricing/udr/udr.d'
import { getudrResValidation } from '@models/pricing/udr/udr.schema'

/**
 * Get streets in BA for parking
 * http://parksys-test.azurewebsites.net/swagger/index.html
 * @returns promise
 */
export function getUdrsInfo() {
  return pricingApi.requestValidate<TudrResData>(
    '/UdrInfo/Udr',
    {
      method: 'GET',
    },
    undefined,
    getudrResValidation
  )
}

/**
 * Get price for parking
 * @param data Information about parking
 * @returns promise
 */
export function getPriceForParking(data: TParkingPriceReqData) {
  return pricingApi.requestValidate<IParkinPriceResData>(
    '/api/ecvparking/charging',
    {
      method: 'POST',
      data,
    },
    getPriceReqValidation,
    getPriceResValidation
  )
}
