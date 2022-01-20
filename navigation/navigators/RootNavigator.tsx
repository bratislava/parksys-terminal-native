import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useContext } from 'react'

import NotFoundScreen from '../../screens/NotFoundScreen/NotFoundScreen'
import { RootStackParamList } from 'types'

import { SafeAreaView } from 'react-native-safe-area-context'

import SessionClose from '@screens/SessionClose'
import baseHeaderOptions from '@lib/navigation/baseHeaderOptions'
import i18n from 'i18n-js'
import EnterParkingInfo from '@screens/ParkingOrder/EnterParkingInfo'
import ParkingOrderSummary from '@screens/ParkingOrder/ParkingOrderSummary'
import PayByCash from '@screens/ParkingOrder/PayByCash'
import PayByCard from '@screens/ParkingOrder/PayByCard/PayByCard'
import TransactionsHistory from '@screens/TransactionsHistory'
import TransactionDetail from '@screens/TransactionDetail'
import Settings from '@screens/Settings'
import Home from '@screens/Home'
import ParkinOrderPaymentType from '@screens/ParkingOrder/ParkinOrderPaymentType'

import { Button } from '../../components/ui'
import { GlobalContext } from '@state/GlobalContextProvider'

const t = i18n.t

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { setIsConfirmationModalShown } = useContext(GlobalContext)

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <Stack.Navigator
        screenOptions={{ headerShown: true, ...baseHeaderOptions }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
        <Stack.Screen
          name="SessionClose"
          component={SessionClose}
          options={{
            headerShown: true,
            title: t('screens.sessionClose.title'),
          }}
        />
        <Stack.Screen
          name="EnterParkingInfo"
          component={EnterParkingInfo}
          options={{
            headerShown: true,
            title: t('screens.enterParkingInfo.title'),
          }}
        />
        <Stack.Screen
          name="ParkingOrderSummary"
          component={ParkingOrderSummary}
          options={{
            headerShown: true,
            headerTitle: i18n.t('screens.parkingOrderSummary.title'),
          }}
          initialParams={{}}
        />
        <Stack.Screen
          name="ParkinOrderPaymentType"
          component={ParkinOrderPaymentType}
          options={{
            headerShown: true,
            headerTitle: i18n.t('screens.parkinOrderPaymentType.title'),
            headerLeft: () => (
              <Button
                onPress={() => setIsConfirmationModalShown(true)}
                title={i18n.t('screens.parkinOrderPaymentType.close')}
              />
            ),
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name="PayByCash"
          component={PayByCash}
          options={{ headerShown: false }}
          initialParams={{}}
        />
        <Stack.Screen
          name="PayByCard"
          component={PayByCard}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="TransactionsHistory"
          component={TransactionsHistory}
          options={{ headerTitle: t('screens.transactionsHistory.title') }}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{ headerTitle: t('screens.transactionDetail.title') }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: i18n.t('screens.settings.title') }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default React.memo(RootNavigator)
