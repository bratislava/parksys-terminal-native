import { colors } from '@utils/theme'
import { StackNavigationOptions } from '@react-navigation/stack'

const baseHeaderOptions: StackNavigationOptions = {
  headerTintColor: colors.white,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.info,
  },
  headerTitleStyle: {
    fontSize: 30,
  },
}

export default baseHeaderOptions
