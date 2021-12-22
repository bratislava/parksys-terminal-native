import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './translations'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
// import * as Sentry from 'sentry-expo'

import useCachedResources from '@hooks/useCachedResources'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@utils/theme'
import { SecurityLayout } from '@components/layout'
import AzureProvider from '@components/layout/AzureProvider/AzureProvider'

// TODO create Sentry project & integrate
// Sentry.init({
//   dsn: 'TODO', //found in Settings > Client Keys tab
//   enableInExpoDevelopment: true,
//   debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
// })

const queryClient = new QueryClient()
import { focusManager } from 'react-query'
import useAppState from 'react-native-appstate-hook'
import { AppStateStatus, Platform } from 'react-native'

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

export default function App() {
  const isLoadingComplete = useCachedResources()
  useAppState({
    onChange: onAppStateChange,
  })

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AzureProvider>
              <SecurityLayout />
            </AzureProvider>
            <StatusBar />
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    )
  }
}
