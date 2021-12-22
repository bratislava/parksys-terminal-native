export const colors = {
  primary: '#C22604',
  secondary: '#444444',
  green: '#579636',
  tertiary: '#FFE600',
  alert: '#FD4344',
  error: '#B03030',
  gray: '#C3C3C3',
  lighterGray: '#b0b0b0', // 0.1 alpha
  mediumGray: '#C5C5C5',
  lightLightGray: '#F5F5F5', //TODO can we merge it from lightergray?
  lightGray: '#dedede',
  lightText: '#83919b',
  darkText: '#454545',
  white: '#ffffff',
  black: '#16254C',
  blackLighter: '#444444',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  info: '#16254C',
  warn: 'orange',
} as const

export const defaultTheme = {
  colors,
} as const

export type TDefaultTheme = typeof defaultTheme

export const mhdDefaultColors = {
  grey: '#9E9E9E',
}
