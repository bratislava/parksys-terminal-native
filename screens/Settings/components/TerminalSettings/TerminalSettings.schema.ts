import * as Yup from 'yup'

export interface ITerminalForm {
  hideFrontActivity: boolean
  isKioskMode: boolean
}

export const validationSchema = Yup.object({
  hideFrontActivity: Yup.boolean().required().default(false),
  isKioskMode: Yup.boolean().required().default(false),
})

export const initialValues = validationSchema.getDefault() as ITerminalForm
