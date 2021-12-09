import * as React from 'react'
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import { ButtonSC, COLORS, FONT_WEIGHT, styles } from './Button.styled'
import ButtonGroup from './ButtonGroup'

interface ButtonProps extends PressableProps {
  title?: string
  // icon?: IconName
  isGrouped?: boolean
  isFullWidth?: boolean
  variant?:
    | 'primary'
    | 'primary-submit'
    | 'secondary'
    | 'tertiary'
    | 'filled'
    | 'danger'
    | 'chat'
  size?: 'small' | 'medium' | 'large'
  titleStyle?: StyleProp<TextStyle>
  disabled?: boolean
  loading?: boolean
  testID?: string
  activeOpacity?: number
  contentContainerStyle?: StyleProp<ViewStyle>
}

type TButton = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<View>
> & {
  Group: typeof ButtonGroup
}

const _Button = (
  {
    title,
    variant = 'primary',
    isGrouped,
    isFullWidth,
    size = 'medium',
    disabled,
    titleStyle,
    loading,
    testID,
    style,
    activeOpacity = 0.85,
    contentContainerStyle,
    ...rest
  }: ButtonProps,
  ref?: React.Ref<View>
) => {
  const showDisabledStyle = disabled && !loading

  function getStyle(styleProps: PressableStateCallbackType) {
    return [
      styles.touchable,
      isGrouped && styles.touchableGrouped,
      isGrouped && size === 'small' && styles.touchableGroupedSmall,
      isFullWidth && styles.touchableFullWidth,
      {
        backgroundColor: showDisabledStyle
          ? COLORS.disabledBackgroundColor[variant]
          : COLORS.backgroundColor[variant],
        borderColor: showDisabledStyle
          ? COLORS.disabledBorderColor[variant]
          : COLORS.borderColor[variant],
      },
      style ? (typeof style === 'function' ? style(styleProps) : style) : null,
    ]
  }

  return (
    <ButtonSC
      {...rest}
      style={getStyle}
      testID={testID}
      disabled={disabled || loading}
      ref={ref}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            styles[size],
            { opacity: pressed ? activeOpacity : 1 },
            contentContainerStyle,
          ]}
        >
          {loading ? (
            <Text
              style={[
                {
                  color: COLORS.textColor[variant],
                  fontWeight: FONT_WEIGHT[variant],
                },
                titleStyle,
              ]}
            >
              Loading...
            </Text>
          ) : (
            <>
              {!!title && (
                <Text
                  style={[
                    {
                      color: COLORS.textColor[variant],
                      fontWeight: FONT_WEIGHT[variant],
                    },
                    titleStyle,
                  ]}
                >
                  {title}
                </Text>
              )}
            </>
          )}
        </View>
      )}
    </ButtonSC>
  )
}

const Button = React.forwardRef(_Button) as TButton

Button.Group = ButtonGroup

export default Button
