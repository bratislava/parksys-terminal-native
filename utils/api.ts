import Constants from 'expo-constants'
import { apiMhdStops } from './validation'

const host =
  Constants.manifest?.extra?.apiHost || 'https://live-dev.planner.bratislava.sk'

// we should throw throwables only, so it's useful to extend Error class to contain useful info
export class ApiError extends Error {
  status: number
  response: Response
  constructor(response: Response) {
    super(response.statusText)
    this.status = response.status
    this.response = response
    this.name = 'ApiError'
  }
}

// helper with a common fetch pattern for json endpoints & baked in host
const fetchJsonFromApi = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${host}${path}`, options)
  if (response.ok) {
    return response.json()
  } else {
    throw new ApiError(response)
  }
}

export const getMhdStops = async () =>
  apiMhdStops.validateSync(await fetchJsonFromApi('/mhd/stops'))
