import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './translations'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as Location from 'expo-location'
import Constants, { ExecutionEnvironment } from 'expo-constants'
import * as Sentry from 'sentry-expo'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    : Constants.executionEnvironment === ExecutionEnvironment.Standalone // for now, consider 'production' apps running in Expo Go staging, update once we have more BE envs
    ? 'production'
    : 'staging',
})

Constants.expoConfig?.developmentClient

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

Location.setGoogleApiKey(Constants.expoConfig?.extra?.googlePlacesApiKey)

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
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>
      </>
    )
  }
}

export default Sentry.Native.wrap(App)
