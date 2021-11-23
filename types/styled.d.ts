// import original module declarations
import 'styled-components/native'
import { TDefaultTheme } from '@utils/theme'

// and extend them!
declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends TDefaultTheme {}
}
