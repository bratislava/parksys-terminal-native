export enum ETicketState {
  NEW = 'NEW', //(new transaction)
  GET_PRICE = 'GET_PRICE', // (trying to check price)
  PRICE_WAS_CHANGED = 'PRICE_WAS_CHANGED', // (error when price was changed)
  GET_PAYMENT_PRICE = 'GET_PAYMENT_PRICE', // (price was checked, you can go to pay)
  GET_PAYMENT_PRICE_FAILED = 'GET_PAYMENT_PRICE_FAILED', // (failed befor you can go to payment - parksys error)
  PAYMENT_FAILED = 'PAYMENT_FAILED', // (paymend failed in terminal or webpay)
  PAYMENT_AUTH = 'PAYMENT_AUTH', // (after payment was succesful authentified by payment_id)
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS', // (payment was success)
  TICKET_FAILED = 'TICKET_FAILED', // (ticket failed)
  SUCCESS = 'SUCCESS', // (succesfully added to parksys)
}

export type TTicketState = `${ETicketState}`
