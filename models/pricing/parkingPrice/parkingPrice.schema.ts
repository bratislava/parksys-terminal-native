import * as Yup from 'yup'

export const getPriceReqValidation = Yup.object({
  partnerId: Yup.string().required(),
  terminalId: Yup.string().required(),
  udr: Yup.string().required(),
  parkingEnd: Yup.string().required(),
  ecv: Yup.string().required(),
})

export const cardInfoValidation = Yup.object({
  id: Yup.string().required(),
  cardSchemeGroupName: Yup.string().required(),
})

export const tariffIntervalDetailValidation = Yup.object({
  tariffStart: Yup.string().required(),
  tariffEnd: Yup.string().required(),
  timeInTariff: Yup.string().required(),
  tariffPrice: Yup.number().required(),
  parkingLimit: Yup.string().required(),
})

export const priceBreakdownValidation = Yup.object({
  creditUsed: Yup.string().required(),
  price: Yup.number().required(),
  tariffIntervalDetail: tariffIntervalDetailValidation,
})

export const getPriceResValidation = Yup.object({
  ticketStart: Yup.string().required(),
  ticketEnd: Yup.string().required(),
  creditBPKUsed: Yup.string().required(),
  creditBPKRemaining: Yup.string().required(),
  priceTotal: Yup.number().required(),
  priceWithoutDiscount: Yup.number().required(),
  priceBreakdown: Yup.array().of(priceBreakdownValidation),
  cardInfo: Yup.array().of(cardInfoValidation),
})
