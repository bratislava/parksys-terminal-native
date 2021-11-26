import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import NotFoundScreen from '../../screens/NotFoundScreen/NotFoundScreen'
import { RootStackParamList } from 'types'

import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTabNavigator from './BottomTabNavigator'

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default React.memo(RootNavigator)
