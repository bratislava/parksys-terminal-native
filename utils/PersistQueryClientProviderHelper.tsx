import { IUdrFeaturesInfo } from '@models/pricing/udr/udr'
import { ActivityIndicator, Text } from 'react-native'
import { useTheme } from 'styled-components'
import i18n from 'i18n-js'

export const handleLoadingDataFromPersistedStorage = (
  data: IUdrFeaturesInfo[] | undefined,
  isLoading: boolean,
  error: Error | null,
  text: React.ReactNode
) => {
  const theme = useTheme()

  if (!data) {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{ opacity: 1 }}
          color={theme.colors.primary}
          animating
        />
      )
    }
    if (error) {
      return <Text>{i18n.t('noDataAvailable')}</Text>
    }
    return
  } else {
    if (error) {
      return (
        <>
          {text} <Text>{i18n.t('staleData')}</Text>
        </>
      )
    }
    return text
  }
}
