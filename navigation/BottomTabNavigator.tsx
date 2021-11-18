/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import i18n from 'i18n-js'

import BurgerMenuSvg from '@images/burger-menu.svg'

import NotFoundScreen from '@screens/NotFoundScreen'

import TabBar from './TabBar'

const BottomTab = createBottomTabNavigator<any>()

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="One"
      tabBarOptions={{
        activeTintColor: '#FD4344',
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <BottomTab.Screen
        name="One"
        component={OneStackNavigator}
        options={{
          title: i18n.t('one'),
          tabBarIcon: BurgerMenuSvg,
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const OneStack = createStackNavigator<any>()

function OneStackNavigator() {
  return (
    <OneStack.Navigator screenOptions={{}}>
      <OneStack.Screen
        name="TabOneScreen"
        component={NotFoundScreen}
        options={{ headerTitle: i18n.t('tabOneTitle'), headerShown: false }}
      />
    </OneStack.Navigator>
  )
}

const TwoStack = createStackNavigator<any>()

function TwoStackNavigator() {
  return (
    <TwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TwoStack.Screen name="TabTwoScreen" component={NotFoundScreen} />
    </TwoStack.Navigator>
  )
}
