import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import i18n from 'i18n-js'
import Settings from '@screens/Settings'

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SettingsStack = createStackNavigator<any>()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ title: i18n.t('screens.settings.title') }}
      />
    </SettingsStack.Navigator>
  )
}

export default React.memo(SettingsNavigator)
