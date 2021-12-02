import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar, { BOTTOM_TAB_NAVIGATOR_HEIGHT } from '@navigation/TabBar'
import i18n from 'i18n-js'
import OneStackNavigator from './OneStackNavigator'
import TwoStackNavigator from './TwoStackNavigator'
import SettingsNavigator from './SettingsNavigator'
import { MaterialIcons } from '@expo/vector-icons'

const BottomTab = createBottomTabNavigator<any>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#FD4344',
        style: {
          height: BOTTOM_TAB_NAVIGATOR_HEIGHT,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ unmountOnBlur: true }}
    >
      <BottomTab.Screen
        name="PaymentStack"
        component={OneStackNavigator}
        options={{
          title: i18n.t('one'),
          tabBarIcon: ({ fill }: any) => {
            return <MaterialIcons name="payment" size={32} color={fill} />
          },
        }}
      />
      <BottomTab.Screen
        name="HistoryStack"
        component={TwoStackNavigator}
        options={{
          title: i18n.t('screens.history.title'),
          tabBarIcon: ({ fill }: any) => {
            return <MaterialIcons name="history" size={32} color={fill} />
          },
        }}
      />
      <BottomTab.Screen
        name="SettingsStack"
        component={SettingsNavigator}
        options={{
          title: i18n.t('screens.settings.title'),
          tabBarIcon: ({ fill }: any) => {
            return <MaterialIcons name="settings" size={32} color={fill} />
          },
        }}
      />
    </BottomTab.Navigator>
  )
}

export default React.memo(BottomTabNavigator)
