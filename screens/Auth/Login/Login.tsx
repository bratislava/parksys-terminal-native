import { Button, Status } from '@components/ui'
import { useAuthContext } from '@lib/context/authContext'
import * as React from 'react'
import { LoginSC } from './Login.styled'

const Login: React.FunctionComponent = () => {
  const { request, result, promptAsync } = useAuthContext()

  return (
    <LoginSC>
      <Status
        title="Welcome to BA parking"
        description="Please login with your Microsoft account to continue"
        icon="local-parking"
        variant={result?.type === 'error' ? 'error' : 'default'}
        extra={
          <Button
            title="Login"
            onPress={() => promptAsync()}
            disabled={!request}
            style={{ width: '100%' }}
          />
        }
      />
    </LoginSC>
  )
}

export default React.memo(Login)
