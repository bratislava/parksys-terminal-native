import udrsApi from '@lib/api/udrsApi'
import { IUdrsOnlineInfo } from '@models/pricing/udr/udr.d'
import { getUdrsOnlineResValidation } from '@models/pricing/udr/udr.schema'

/**
 * Get streets in BA for parking
 * https://s3.bratislava.sk/paas-mpa-prod/assets/gisdata/udr_p.geojson
 * @returns promise
 */
export function getUdrsInfo() {
  return udrsApi.requestValidate<IUdrsOnlineInfo>(
    '/paas-mpa-prod/assets/gisdata/udr_p.geojson',
    {
      method: 'GET',
    },
    undefined,
    getUdrsOnlineResValidation
  )
}
