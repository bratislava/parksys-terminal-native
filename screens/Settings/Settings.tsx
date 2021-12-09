import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import UserInfo from './components/UserInfo'
import { SettingsSC } from './Settings.styled'

export const Settings: React.FunctionComponent = () => {
  return (
    <SettingsSC>
      <ScrollView contentContainerStyle={styles.list}>
        <UserInfo />
      </ScrollView>
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
