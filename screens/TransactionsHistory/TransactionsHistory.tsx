import { useAuthContext } from '@lib/context/authContext'
import { ITicketHistoryItem } from '@models/pricing/getTickets/getTickets.dto'
import { getTickets } from '@services/external/pricing.api'
import React from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import { useInfiniteQuery } from 'react-query'
import TransactionHistoryItem from './components/TransactionHistoryItem'
import { ItemSeparator } from './components/TransactionHistoryItem/TransactionHistoryItem.styled'
import { TransactionsHistorySC } from './TransactionsHistory.styled'
import { Status } from '@components/ui'
import i18n from 'i18n-js'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HistoryStackParamList } from 'types'

const t = i18n.t

const PER_PAGE = 20

const TransactionsHistory: React.FunctionComponent = () => {
  const { profile } = useAuthContext()
  const { push } = useNavigation<StackNavigationProp<HistoryStackParamList>>()

  const getTicketsHandler = React.useCallback(
    ({ pageParam = 1 }: any) => {
      if (!profile) {
        throw new Error('Not logged in')
      }

      return getTickets({
        employee: profile.id,
        pageSize: PER_PAGE,
        currentPage: pageParam,
      })
    },
    [profile]
  )

  const _onPress = React.useCallback(
    (item: ITicketHistoryItem) => {
      push('TransactionDetail', { item })
    },
    [push]
  )

  const _keyExtractor = React.useCallback((item: ITicketHistoryItem) => {
    return item.id
  }, [])

  const _renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<ITicketHistoryItem>) => {
      return <TransactionHistoryItem item={item} onPress={_onPress} />
    },
    [_onPress]
  )

  const { data, isLoading, error, refetch, fetchNextPage, remove } =
    useInfiniteQuery(['getTicketsHandler', profile], getTicketsHandler, {
      cacheTime: 0,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage.pagination
        if (
          (pagination.currentPage + 1) * pagination.pageSize <=
          pagination.total
        ) {
          return pagination.currentPage + 1
        }
        return undefined
      },
    })

  const _onEndReached = React.useCallback(() => {
    if (!isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, isLoading])

  const onRefresh = React.useCallback(() => {
    remove()
    refetch()
  }, [refetch, remove])

  const errorHeader = React.useMemo(() => {
    return error ? (
      <Status
        title={t('screens.transactionsHistory.error.title')}
        description={t('screens.transactionsHistory.error.description')}
        variant="error"
      />
    ) : null
  }, [error])

  const flattenData = React.useMemo(
    () => (data?.pages ? data.pages.flatMap((page) => page.items) : []),
    [data]
  )

  return (
    <TransactionsHistorySC>
      <FlatList
        ListHeaderComponent={errorHeader}
        data={flattenData}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        refreshing={isLoading}
        ItemSeparatorComponent={ItemSeparator}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={error ? styles.wrapper : undefined}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.01}
      />
    </TransactionsHistorySC>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default React.memo(TransactionsHistory)
