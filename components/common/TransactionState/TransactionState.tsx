import { TTicketState } from '@models/pricing/pricing'
import React from 'react'
import { Text, TextProps } from 'react-native'
import i18n from 'i18n-js'

const t = i18n.t

function getState(state?: TTicketState) {
  if (state) {
    return t(`components.transactionState.${state}`)
  }

  return '???'
}

interface TransactionStateProps extends TextProps {
  state?: TTicketState
}

const TransactionState: React.FunctionComponent<TransactionStateProps> = ({
  state,
  ...rest
}) => {
  return <Text {...rest}>{getState(state)}</Text>
}

export default TransactionState
