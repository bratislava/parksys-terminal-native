import { Ionicons } from '@expo/vector-icons'
import {
  captureException,
  captureMessage,
} from '@services/internal/sentry.service'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        })
        throw new Error('Updated error')
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        captureMessage('[BaseApi]: refresh failed', {
          extra: { response: e, obj: { hello: 47 } },
        })
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
