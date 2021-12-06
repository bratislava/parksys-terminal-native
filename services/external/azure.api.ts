import graphApi from '@lib/api/graphApi'
import { IAzureProfile } from '@models/azure/user/azureUser'
import { azureUserResValidation } from '@models/azure/user/azureUser.schema'

/**
 * get user profile from Azure
 * @returns promise
 */
export function getUserProfile() {
  return graphApi.requestValidate<IAzureProfile>(
    '/v1.0/me',
    {},
    undefined,
    azureUserResValidation
  )
}
