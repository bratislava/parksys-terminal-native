import Constants from 'expo-constants'
import udrsApi from '@lib/api/udrsApi'
import { IUdrsOnlineInfo } from '@models/pricing/udr/udr.d'
import { udrsOnlineValidation } from '@models/pricing/udr/udr.schema'

/**
 * Get streets in BA for parking
 * https://s3.bratislava.sk/paas-mpa-prod/assets/gisdata/udr_p.geojson
 * @returns Promise<IUdrsOnlineInfo>
 */
export function getUdrsInfo() {
  return udrsApi.requestValidate<IUdrsOnlineInfo>(
    Constants.expoConfig?.extra?.dev
      ? '/paas-mpa-staging/assets/gisdata/udr_p.geojson'
      : '/paas-mpa-prod/assets/gisdata/udr_p.geojson',
    {
      method: 'GET',
    },
    undefined,
    udrsOnlineValidation
  )
}
