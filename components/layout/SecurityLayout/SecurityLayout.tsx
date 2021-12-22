import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import LinkingConfiguration from '@navigation/LinkingConfiguration'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import AuthNavigator from '@navigation/navigators/AuthNavigator'
import RootNavigator from '@navigation/navigators/RootNavigator'
import { useAuthContext } from '@lib/context/authContext'
import SessionProvider from '../SessionProvider'

/**
 * Component to handle authentication of app
 */
const SecurityLayout: React.FunctionComponent = () => {
  const colorScheme = useColorScheme()
  const { loggedIn } = useAuthContext()

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {loggedIn ? (
        <SessionProvider>
          <RootNavigator />
        </SessionProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  )
}

export default SecurityLayout
