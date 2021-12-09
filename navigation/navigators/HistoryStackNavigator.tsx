import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TransactionsHistory from '@screens/TransactionsHistory'
import i18n from 'i18n-js'
import { HistoryStackParamList } from 'types'
import TransactionDetail from '@screens/TransactionDetail'

const t = i18n.t

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HistoryStack = createStackNavigator<HistoryStackParamList>()

function HistoryStackNavigator() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="TransactionsHistory"
        component={TransactionsHistory}
        options={{ headerTitle: t('screens.transactionsHistory.title') }}
      />
      <HistoryStack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{ headerTitle: t('screens.transactionDetail.title') }}
      />
    </HistoryStack.Navigator>
  )
}

export default React.memo(HistoryStackNavigator)
