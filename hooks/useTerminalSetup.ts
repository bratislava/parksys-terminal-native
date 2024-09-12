import React from 'react'
import { ISetupTerminalReqParams } from '@models/papaya/setupTerminal/setupTerminal.d'
import { setupTerminal } from '@services/external/papaya.api'
import { useMutation } from '@tanstack/react-query'

const TERMINAL_SETTINGS = {
  hideFrontActivity: true,
  isKioskMode: false,
} as const

const mutation = (data: ISetupTerminalReqParams) => setupTerminal(data)

/**
 * Hook to set correct terminal settings
 */
function useTerminalSetup() {
  const { mutate, isPending } = useMutation({ mutationFn: mutation })

  React.useEffect(() => {
    mutate(TERMINAL_SETTINGS)
  }, [mutate])

  return isPending
}

export default useTerminalSetup
