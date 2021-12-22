import pricingApi from '@lib/api/pricingApi'
import {
  ICreateTicketReqParams,
  ICreateTicketRes,
} from '@models/pricing/createTicket/createTicket.dto'
import {
  createTicketReqValidation,
  createTicketResValidation,
} from '@models/pricing/createTicket/createTicket.schema'
import { ISession } from '@models/pricing/getSession/getSession.dto'
import { getSessionResValidation } from '@models/pricing/getSession/getSession.schema'
import {
  ITickets,
  ITicketsReqParams,
} from '@models/pricing/getTickets/getTickets.dto'
import {
  getTicketsReqValidation,
  getTicketsResValidation,
} from '@models/pricing/getTickets/getTickets.schema'
import {
  TParkingPriceReqData,
  IParkinPriceResData,
} from '@models/pricing/parkingPrice/parkingPrice.dto'
import {
  getPriceReqValidation,
  getPriceResValidation,
} from '@models/pricing/parkingPrice/parkingPrice.schema'
import { ITicketPayment } from '@models/pricing/ticketPayment/ticketPayment.dto'
import {
  getTicketReqValidation,
  getTicketResValidation,
} from '@models/pricing/ticketPayment/ticketPayment.schema'
import { TudrResData } from '@models/pricing/udr/udr.d'
import { getudrResValidation } from '@models/pricing/udr/udr.schema'

/**
 * Get streets in BA for parking
 * http://parksys-test.azurewebsites.net/swagger/index.html
 * !do NOT use for now
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
    '/api-terminal/get-price',
    {
      method: 'POST',
      data,
    },
    getPriceReqValidation,
    getPriceResValidation
  )
}

/**
 * Prepare for payment
 * @param id id of price check
 * @param data data of parking ticket
 * @returns promise
 */
export function ticketPayment(id: string, data: TParkingPriceReqData) {
  return pricingApi.requestValidate<ITicketPayment>(
    `/api-terminal/ticket-payment/${id}`,
    {
      method: 'POST',
      data,
    },
    getTicketReqValidation,
    getTicketResValidation
  )
}

/**
 * Create ticket after successful payment
 * @param id id from price check
 * @param data info about operation
 * @returns promise
 */
export function createTicket(id: string, data: ICreateTicketReqParams) {
  return pricingApi.requestValidate<ICreateTicketRes>(
    `/api-terminal/create-ticket/${id}`,
    {
      method: 'POST',
      data,
    },
    createTicketReqValidation,
    createTicketResValidation
  )
}
/**
 * Get tickets for user
 * @param params params for api
 */
export function getTickets(params: ITicketsReqParams) {
  return pricingApi.requestValidate<ITickets>(
    `/api-terminal/tickets/${params.employee}`,
    { params },
    undefined,
    getTicketsResValidation,
    getTicketsReqValidation
  )
}

/**
 * Get session for user
 * @param employeeId employee id
 * @returns promise
 */
export function getEmployeeSession(employeeId: string) {
  return pricingApi.requestValidate<ISession>(
    `/api-terminal/session/${employeeId}`,
    {
      method: 'POST',
    },
    undefined,
    getSessionResValidation
  )
}

/**
 * Close session with given id
 * @param sessionId session to close
 * @returns promise
 */
export function closeSession(sessionId: string) {
  return pricingApi.request(`/api-terminal/close-session/${sessionId}`, {
    method: 'POST',
  })
}
