import React from 'react'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

import { s } from '../utils/globalStyles'

export const BOTTOM_TAB_NAVIGATOR_HEIGHT = 55

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.title || ''

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableWithoutFeedback key={index} onPress={onPress}>
            <View>
              <TabItem
                label={label}
                isFocused={isFocused}
                IconComponent={options.tabBarIcon as React.FC}
              />
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

export default TabBar

const TabItem = ({
  label,
  isFocused,
  IconComponent,
}: {
  label: string
  isFocused: boolean
  IconComponent: React.FC<{ fill: string }>
}) => {
  return (
    <View style={styles.tabItemWrapper}>
      <View style={styles.tabItemBackground} />
      <View style={styles.tabItem}>
        <IconComponent fill={isFocused ? '#FD4344' : 'gray'} />
        <Text>{label}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: BOTTOM_TAB_NAVIGATOR_HEIGHT,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    ...s.shadow,
  },
  tabItemWrapper: {
    width: 90,
    height: 80,
    position: 'relative',
  },
  tabItemBackground: {
    width: 105,
    height: 80,
    position: 'absolute',
    top: 12.5,
    left: -10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  tabItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    width: 90,
    height: 80,
  },
})
