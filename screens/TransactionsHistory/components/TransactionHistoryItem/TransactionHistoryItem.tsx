import { ITicketHistoryItem } from '@models/pricing/getTickets/getTickets.dto'
import { formatNativeDate } from '@utils/ui/dateUtils'
import { presentPrice } from '@utils/utils'
import React from 'react'
import {
  DateText,
  ECVText,
  PriceText,
  TransactionHistoryItemSC,
} from './TransactionHistoryItem.styled'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import TransactionStateIcon from '@components/common/TransactionStateIcon'

interface TransactionHistoryItemProps {
  item: ITicketHistoryItem
  onPress: (item: ITicketHistoryItem) => void
  odd: boolean
}

const TransactionHistoryItem: React.FunctionComponent<TransactionHistoryItemProps> =
  ({ item, onPress, odd }) => {
    const date = formatNativeDate(new Date(item.created_at), 'd.m.yyyy HH:mm')

    return (
      <TransactionHistoryItemSC onPress={() => onPress(item)} odd={odd}>
        <TransactionStateIcon style={styles.icon} state={item.state} />
        <ECVText>{item.ecv}</ECVText>
        <PriceText>{presentPrice(item.price)}</PriceText>
        <DateText>{date}</DateText>
        <MaterialIcons name="chevron-right" size={24} />
      </TransactionHistoryItemSC>
    )
  }

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
})

export default React.memo(TransactionHistoryItem)
