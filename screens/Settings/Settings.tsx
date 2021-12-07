import * as React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import LogoutSettings from './components/LogoutSettings/LogoutSettings'
import TerminalSettings from './components/TerminalSettings'
import UserInfo from './components/UserInfo'
import { SettingsSC } from './Settings.styled'
import * as Device from 'expo-device'

const IS_DEV_DEVICE = __DEV__ && Platform.OS === 'android' && Device.isDevice

export const Settings: React.FunctionComponent = () => {
  return (
    <SettingsSC>
      <ScrollView contentContainerStyle={styles.list}>
        <UserInfo />
        {IS_DEV_DEVICE ? <TerminalSettings /> : null}
      </ScrollView>
      <LogoutSettings />
    </SettingsSC>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
})

export default React.memo(Settings)
