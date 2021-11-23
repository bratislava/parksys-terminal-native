import { Platform } from 'react-native'

/**
 * https://blog.logrocket.com/applying-box-shadows-in-react-native/
 * @param xOffset
 * @param yOffset
 * @param shadowColorIos
 * @param shadowOpacity
 * @param shadowRadius
 * @param elevation
 * @param shadowColorAndroid
 */
const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    }
  } else if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    }
  }
}

export default generateBoxShadowStyle
