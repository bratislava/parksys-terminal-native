import pricingApi from '@lib/api/pricingApi'
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
