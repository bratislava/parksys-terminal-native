import { EPaymentResult } from './../../../models/papaya/card/card.dto'
import { Alert } from 'react-native'
import i18n from 'i18n-js'
import { ITicketPayment } from '@models/pricing/ticketPayment/ticketPayment.dto'
import { payByCard, printReceipt } from '@services/external/papaya.api'
import generateReceipt from '@utils/terminal/cashReceipt'

const t = i18n.t

export function showPriceChangeAlert(
  onError: () => void,
  onRefetch: () => void
) {
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
        onPress: onRefetch,
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

/**
 * Call pay by card or print receipt
 * @param finalPrice final price from server
 * @param udr urd
 * @param type type of payment
 * @throws PAYMENT_CANCELED, PAYMENT_ERROR
 */
export async function payTicket(
  finalPrice: ITicketPayment,
  type: 'card' | 'cash',
  udr: string | number
) {
  /** sent payment to terminal */
  if (type === 'card') {
    const cardRes = await payByCard({
      externalId: finalPrice.payment_id,
      requestContents: {
        operation: 'CP',
        amount: finalPrice.price.toFixed(2),
        transactionId: finalPrice.payment_id,
      },
      printCustomerReceipt: false,
      printMerchantReceipt: false,
    })

    if (cardRes.content.result === EPaymentResult.CANCELED) {
      throw new Error('PAYMENT_CANCELED')
    } else if (cardRes.content.result !== EPaymentResult.SUCCESS) {
      throw new Error('PAYMENT_ERROR')
    }
  } else if (type === 'cash') {
    /** print custom receipt */
    await printReceipt({
      printData: generateReceipt({
        date: new Date(),
        items: [{ name: `Parkovanie v ${udr}`, price: finalPrice.price }],
      }),
      printer: {},
    })
  } else {
    throw new Error('Wrong type')
  }
}
