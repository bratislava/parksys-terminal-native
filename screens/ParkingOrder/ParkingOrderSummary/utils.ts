import { Alert } from 'react-native'
import i18n from 'i18n-js'

const t = i18n.t

export function showPriceChangeAlert(onError: () => void) {
  Alert.alert(
    t('screens.parkingOrderSummary.priceAlert.title'),
    t('screens.parkingOrderSummary.priceAlert.message'),
    [
      {
        text: t('screens.parkingOrderSummary.priceAlert.resetAction'),
        onPress: onError,
      },
      {
        text: t('screens.parkingOrderSummary.priceAlert.checkAction'),
        style: 'cancel',
      },
    ]
  )
}

export function showErrorAlert(onCancel: () => void) {
  Alert.alert(
    t('screens.parkingOrderSummary.errorAlert.title'),
    t('screens.parkingOrderSummary.errorAlert.message'),
    [
      {
        text: t('screens.parkingOrderSummary.priceAlert.resetAction'),
        onPress: onCancel,
        style: 'cancel',
      },
    ]
  )
}
