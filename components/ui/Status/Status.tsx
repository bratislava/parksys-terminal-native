import * as React from 'react'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'
import {
  StatusSC,
  StatusText,
  StatusDescription,
  TStatusVariant,
  getColor,
} from './Status.styled'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

type TIconsName = keyof typeof MaterialIcons['glyphMap']

const ICON_MAP = new Map<TStatusVariant, TIconsName>([
  ['info', 'info'],
  ['warn', 'warning'],
  ['error', 'error'],
])

interface StatusProps {
  /**
   * Title in big font
   */
  title: string
  /**
   * Description of status
   */
  description?: string
  /**
   * Variant os status
   */
  variant?: TStatusVariant
  /**
   * Custom wrapper style
   */
  style?: StyleProp<ViewStyle>
  /**
   * Extra component as footer
   */
  extra?: React.ReactNode
  /**
   * Variants have default icons.
   * If null, then icon will NOT be displayed
   */
  icon?: TIconsName | null
  /**
   * Show loading indicator
   */
  loading?: boolean
}

/**
 * Display status to user
 */
const Status: React.FunctionComponent<StatusProps> = ({
  title,
  description,
  variant = 'default',
  style,
  extra,
  icon,
  loading,
}) => {
  const theme = useTheme()

  const IconIndicator = React.useMemo(() => {
    if (loading) {
      return <ActivityIndicator size="large" />
    }

    if (icon === null) {
      return null
    }
    return (
      <MaterialIcons
        name={icon ?? ICON_MAP.get(variant) ?? 'info'}
        size={50}
        color={getColor(theme, variant)}
      />
    )
  }, [icon, loading, theme, variant])

  return (
    <StatusSC style={style}>
      {IconIndicator}
      <StatusText variant={variant}>{title}</StatusText>
      {description ? (
        <StatusDescription>{description}</StatusDescription>
      ) : null}
      {extra ? <>{extra}</> : null}
    </StatusSC>
  )
}

export default React.memo(Status)
