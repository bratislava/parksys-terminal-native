import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

interface ButtonGroupProps {
  children: (JSX.Element | undefined)[] | JSX.Element
  style?: ViewStyle
  fillSpace?: boolean
  vertical?: boolean
}

const ButtonGroup = ({
  children,
  vertical = false,
  fillSpace = true,
  style,
}: ButtonGroupProps) => (
  <View
    style={[styles.buttonGroup, vertical && styles.buttonGroupVertical, style]}
  >
    {React.Children.map(
      children,
      (child, index) =>
        child &&
        React.cloneElement(child, {
          isGrouped: index > 0 && !vertical,
          isFullWidth: fillSpace && !vertical,
          style: vertical
            ? { marginTop: index > 0 ? 16 : 0, ...child.props.style }
            : child.props.style,
        })
    )}
  </View>
)

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonGroupVertical: {
    flexDirection: 'column',
  },
})

export default ButtonGroup
