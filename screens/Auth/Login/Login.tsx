import { FormItem } from '@components/form'
import { AvoidKeyboard, Button, Input } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import { useFormik } from 'formik'
import * as React from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { ILoginForm, initialValues, loginValidation } from './login.schema'
import { LoginError, LoginSC, StatusSC } from './Login.styled'
import i18n from 'i18n-js'

/**
 * Login user by username and password
 */
const Login: React.FunctionComponent = () => {
  const { login } = useAuthContext()
  const passwordRef = React.useRef<TextInput>(null)

  const {
    mutate: loginMutation,
    error,
    isPending,
  } = useMutation({
    mutationFn: ({ username, password }: ILoginForm) => {
      return login(username, password)
    },
  })

  /**
   * Submit form
   */
  const onSubmit = React.useCallback(
    (values: ILoginForm) => {
      loginMutation(values)
    },
    [loginMutation]
  )

  /**
   * Focus password on username enter
   */
  const handleUsernameSubmit = React.useCallback(() => {
    passwordRef.current?.focus()
  }, [])

  const { values, errors, submitForm, isValid, setFieldValue } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginValidation,
  })

  return (
    <LoginSC>
      <AvoidKeyboard>
        <ScrollView contentContainerStyle={styles.scroll}>
          <StatusSC
            title={i18n.t('screens.login.title')}
            description={i18n.t('screens.login.description')}
            icon="local-parking"
          />
          <FormItem
            label={i18n.t('screens.login.username')}
            error={errors.username ? i18n.t(errors.username) : undefined}
          >
            <Input
              value={values.username}
              onChangeText={(text) => setFieldValue('username', text)}
              onSubmitEditing={handleUsernameSubmit}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </FormItem>
          <FormItem
            label={i18n.t('screens.login.password')}
            error={errors.password ? i18n.t(errors.password) : undefined}
          >
            <Input
              value={values.password}
              onChangeText={(text) => setFieldValue('password', text)}
              secureTextEntry
              blurOnSubmit
              onSubmitEditing={() => submitForm()}
              ref={passwordRef}
            />
          </FormItem>
          <Button
            title={i18n.t('screens.login.submitAction')}
            onPress={submitForm}
            variant={isValid ? 'primary-submit' : 'secondary'}
            style={styles.button}
            loading={isPending}
          />
          {error ? (
            <LoginError>{i18n.t('screens.login.errors.loginError')}</LoginError>
          ) : null}
        </ScrollView>
      </AvoidKeyboard>
    </LoginSC>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    paddingBottom: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
})

export default React.memo(Login)
