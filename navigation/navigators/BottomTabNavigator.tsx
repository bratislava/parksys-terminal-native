import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar, { BOTTOM_TAB_NAVIGATOR_HEIGHT } from '@navigation/TabBar'
import i18n from 'i18n-js'
import OneStackNavigator from './OneStackNavigator'
import TwoStackNavigator from './TwoStackNavigator'
import BurgerMenuSvg from '@images/burger-menu.svg'
import { MaterialIcons } from '@expo/vector-icons'

const BottomTab = createBottomTabNavigator<any>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="One"
      tabBarOptions={{
        activeTintColor: '#FD4344',
        style: {
          height: BOTTOM_TAB_NAVIGATOR_HEIGHT,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <BottomTab.Screen
        name="One"
        component={OneStackNavigator}
        options={{
          title: i18n.t('one'),
          tabBarIcon: ({ fill }: any) => {
            return <MaterialIcons name="payment" size={32} color={fill} />
          },
        }}
      />
      <BottomTab.Screen
        name="Two"
        component={TwoStackNavigator}
        options={{
          title: i18n.t('two'),
          tabBarIcon: BurgerMenuSvg,
        }}
      />
    </BottomTab.Navigator>
  )
}

export default React.memo(BottomTabNavigator)
