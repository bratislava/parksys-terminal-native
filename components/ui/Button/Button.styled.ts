import { colors } from '@utils/theme'
import { Pressable, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

const DISABLED_ALPHA = '50' // 0.25

type FontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export const FONT_WEIGHT: Record<string, FontWeightType> = {
  primary: 'normal',
  'primary-submit': 'bold',
  secondary: 'normal',
  tertiary: 'normal',
  filled: 'normal',
  danger: 'normal',
  chat: 'normal',
  outlined: 'normal',
} as const

export const styles = StyleSheet.create({
  touchable: {
    borderRadius: 250,
    borderWidth: 1,
  },
  touchableFullWidth: {
    flex: 1,
  },
  touchableGrouped: {
    marginLeft: 16,
  },
  touchableGroupedSmall: {
    marginLeft: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  small: {
    height: 32,
    borderRadius: 16,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  medium: {
    height: 50,
    borderRadius: 250,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  large: {
    height: 48,
    borderRadius: 24,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  iconSpacing: {
    marginRight: 4,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  lottieView: {
    height: 15,
  },
})

export const COLORS = {
  backgroundColor: {
    primary: colors.primary,
    'primary-submit': colors.green,
    secondary: 'transparent',
    filled: colors.secondary,
    tertiary: 'transparent',
    danger: colors.error,
    chat: 'transparent',
  },
  disabledBackgroundColor: {
    primary: `${colors.primary}${DISABLED_ALPHA}`,
    'primary-submit': colors.gray,
    secondary: 'transparent',
    filled: `${colors.secondary}${DISABLED_ALPHA}`,
    tertiary: 'transparent',
    danger: `${colors.error}${DISABLED_ALPHA}`,
    chat: 'transparent',
  },
  underlayColor: {
    primary: colors.primary,
    'primary-submit': colors.primary,
    secondary: colors.secondary,
    filled: colors.secondary,
    tertiary: '#e5e5e5',
    danger: colors.error,
    chat: '#e5e5e5',
  },
  iconColor: {
    primary: colors.white,
    'primary-submit': colors.white,
    secondary: colors.secondary,
    tertiary: colors.lightText,
    filled: colors.white,
    danger: colors.white,
    chat: colors.darkText,
  },
  textColor: {
    primary: colors.white,
    'primary-submit': colors.white,
    secondary: colors.secondary,
    tertiary: colors.lightText,
    filled: colors.white,
    danger: colors.white,
    chat: colors.darkText,
  },
  borderColor: {
    primary: 'transparent',
    'primary-submit': 'transparent',
    secondary: colors.secondary,
    filled: 'transparent',
    tertiary: 'transparent',
    danger: 'transparent',
    chat: 'transparent',
  },
  disabledBorderColor: {
    primary: 'transparent',
    'primary-submit': 'transparent',
    secondary: `${colors.secondary}${DISABLED_ALPHA}`,
    filled: 'transparent',
    tertiary: 'transparent',
    danger: 'transparent',
    chat: 'transparent',
  },
}

export const ButtonSC = styled(Pressable)`
  border-radius: 250px;
  overflow: hidden;
`
