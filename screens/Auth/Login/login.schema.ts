import * as Yup from 'yup'

export interface ILoginForm {
  username: string
  password: string
}

export const loginValidation: Yup.SchemaOf<ILoginForm> = Yup.object({
  username: Yup.string()
    .required('screens.login.errors.usernameRequired')
    .default(''),
  password: Yup.string()
    .required('screens.login.errors.passwordRequired')
    .default(''),
})

export const initialValues = loginValidation.getDefault() as ILoginForm
