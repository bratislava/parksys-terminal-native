import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import i18n from 'i18n-js'

import { RootStackParamList } from '../types'
import { getMhdStops } from '@utils/api'
import { useQuery } from 'react-query'

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  // example fetching - when loading is successful, data is defined & correctly typed
  const { data, isLoading, error } = useQuery(['getMhdStops'], getMhdStops)
  console.log(data, isLoading, error)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('screens.notFound.title')}</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}
      >
        <Text style={styles.linkText}>{i18n.t('screens.notFound.goHome')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
