import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TTicketState } from '@models/pricing/pricing'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { useTheme } from 'styled-components'

type TIconsName = keyof typeof MaterialIcons['glyphMap']

interface TransactionStateIconProps
  extends Omit<IconProps<TIconsName>, 'name' | 'color'> {
  state?: TTicketState
}

const TransactionStateIcon: React.FunctionComponent<TransactionStateIconProps> =
  ({ state, ...rest }) => {
    const theme = useTheme()

    if (!state) {
      return null
    }

    switch (state) {
      case 'SUCCESS':
      case 'PAYMENT_SUCCESS':
        return (
          <MaterialIcons
            name="check-circle"
            color={theme.colors.green}
            size={16}
            {...rest}
          />
        )
      case 'GET_PAYMENT_PRICE':
      case 'GET_PRICE':
      case 'NEW':
      case 'PRICE_WAS_CHANGED':
        return (
          <MaterialIcons
            name="timer"
            color={theme.colors.warn}
            size={16}
            {...rest}
          />
        )

      default:
        return (
          <MaterialIcons
            name="error"
            color={theme.colors.error}
            size={16}
            {...rest}
          />
        )
    }
  }

export default TransactionStateIcon
