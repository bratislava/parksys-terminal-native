import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '@screens/Auth'

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AuthStack = createStackNavigator<any>()

function TwoStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

export default React.memo(TwoStackNavigator)
