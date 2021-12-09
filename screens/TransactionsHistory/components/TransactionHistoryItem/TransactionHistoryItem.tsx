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
}

const TransactionHistoryItem: React.FunctionComponent<TransactionHistoryItemProps> =
  ({ item, onPress }) => {
    const date = formatNativeDate(new Date(item.created_at), 'd.m.yyyy HH:mm')

    return (
      <TransactionHistoryItemSC onPress={() => onPress(item)}>
        <TransactionStateIcon style={styles.icon} state={item.state} />
        <ECVText>{item.ecv}</ECVText>
        <PriceText>{presentPrice(item.price * 100)}</PriceText>
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
