import { Asserts } from 'yup'
import { printReqValidation, printResValidation } from './print.schema'

export type TPrintRequestData = Asserts<typeof printReqValidation>
export type TPrintResponseData = Asserts<typeof printResValidation>
