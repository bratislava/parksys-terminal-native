import * as Yup from 'yup'

export const setupTerminalReqValidation = Yup.object({
  hideFrontActivity: Yup.boolean(),
  isKioskMode: Yup.boolean(),
})

export const setupTerminalResValidation = Yup.object({
  hideFrontActivity: Yup.boolean(),
  isKioskMode: Yup.boolean(),
})
