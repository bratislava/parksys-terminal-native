import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotFoundScreen from '@screens/NotFoundScreen'

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TwoStack = createStackNavigator<any>()

function TwoStackNavigator() {
  return (
    <TwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TwoStack.Screen name="TabTwoScreen" component={NotFoundScreen} />
    </TwoStack.Navigator>
  )
}

export default React.memo(TwoStackNavigator)
