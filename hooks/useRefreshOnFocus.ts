import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

/**
 * https://react-query.tanstack.com/react-native
 */
function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const enabledRef = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch])
  )
}

export default useRefreshOnFocus
