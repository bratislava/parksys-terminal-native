import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './translations'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

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
    : Constants.executionEnvironment === ExecutionEnvironment.Standalone // 'production' builds running in Expo Go are considered staging
    ? 'production'
    : 'staging',
})

Constants.expoConfig?.developmentClient

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})
import { focusManager } from '@tanstack/react-query'
// import useAppState from 'react-native-appstate-hook'
import { AppStateStatus, Platform } from 'react-native'
import SetupTerminal from '@components/common/SetupTerminal'
import { ENABLE_SENTRY_LOGGING } from '@services/internal/sentry.service'
import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Setup focus manager
 * https://react-query.tanstack.com/react-native
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

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
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister }}
            >
              <SetupTerminal />
              <SafeAreaProvider>
                <AzureProvider>
                  <SecurityLayout />
                </AzureProvider>
              </SafeAreaProvider>
            </PersistQueryClientProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </>
    )
  }
}

export default Sentry.Native.wrap(App)
