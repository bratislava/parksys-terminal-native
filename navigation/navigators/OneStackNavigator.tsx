import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import i18n from 'i18n-js'
import EnterParkingInfo from '@screens/ParkingOrder/EnterParkingInfo'
import ParkingOrderSummary from '@screens/ParkingOrder/ParkingOrderSummary'
import { TOneStackParamList } from 'types'
import PaymentStatus from '@screens/ParkingOrder/PaymentStatus'
import PayByCash from '@screens/ParkingOrder/PayByCash'
import PayByCard from '@screens/ParkingOrder/PayByCard/PayByCard'

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const OneStack = createStackNavigator<TOneStackParamList>()

function OneStackNavigator() {
  return (
    <OneStack.Navigator screenOptions={{}}>
      <OneStack.Screen
        name="EnterParkingInfo"
        component={EnterParkingInfo}
        options={{ headerTitle: i18n.t('screens.enterParkingInfo.title') }}
      />
      <OneStack.Screen
        name="ParkingOrderSummary"
        component={ParkingOrderSummary}
        options={{ headerTitle: i18n.t('screens.parkingOrderSummary.title') }}
        initialParams={{}}
      />
      <OneStack.Screen
        name="PaymentStatus"
        component={PaymentStatus}
        options={{ headerShown: false }}
        initialParams={{}}
      />
      <OneStack.Screen
        name="PayByCash"
        component={PayByCash}
        options={{ headerShown: false }}
        initialParams={{}}
      />
      <OneStack.Screen
        name="PayByCard"
        component={PayByCard}
        options={{ headerShown: false }}
        initialParams={{}}
      />
    </OneStack.Navigator>
  )
}

export default React.memo(OneStackNavigator)
