// we should throw throwables only, so it's useful to extend Error class to contain useful info
class ApiError extends Error {
  status: number
  response: Response
  constructor(response: Response) {
    super(response.statusText)
    this.status = response.status
    this.response = response
    this.name = 'ApiError'
  }
}

export default ApiError
