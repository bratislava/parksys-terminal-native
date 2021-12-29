import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './translations'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as Location from 'expo-location'
import Constants, { AppOwnership } from 'expo-constants'
import * as Sentry from 'sentry-expo'

import useCachedResources from '@hooks/useCachedResources'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@utils/theme'
import { SecurityLayout } from '@components/layout'
import AzureProvider from '@components/layout/AzureProvider/AzureProvider'

Sentry.init({
  dsn: 'https://9edd6953f5274c07a0b6df3699137885@o701870.ingest.sentry.io/6127463',
  enableInExpoDevelopment: true, // needed because of Expo, is overriden when enabled is false
  enabled: ENABLE_SENTRY_LOGGING, // change this in sentry.service.ts
  debug: __DEV__,
  environment: __DEV__
    ? 'development'
    : Constants.appOwnership === AppOwnership.Standalone // for now, consider 'production' apps running in Expo Go staging, update once we have more BE envs
    ? 'production'
    : 'staging',
})

Constants.manifest?.developmentClient

const queryClient = new QueryClient()
import { focusManager } from 'react-query'
// import useAppState from 'react-native-appstate-hook'
import { AppStateStatus, Platform } from 'react-native'
import SetupTerminal from '@components/common/SetupTerminal'
import { ENABLE_SENTRY_LOGGING } from '@services/internal/sentry.service'

/**
 * Setup focus manager
 * https://react-query.tanstack.com/react-native
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

Location.setGoogleApiKey(Constants.manifest?.extra?.googlePlacesApiKey)

const App = () => {
  const isLoadingComplete = useCachedResources()
  // useAppState({
  //   onChange: onAppStateChange,
  // })

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <ThemeProvider theme={defaultTheme}>
          <QueryClientProvider client={queryClient}>
            <SetupTerminal />
            <SafeAreaProvider>
              <AzureProvider>
                <SecurityLayout />
              </AzureProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default Sentry.Native.wrap(App)
