import useTerminalSetup from '@hooks/useTerminalSetup'
import React from 'react'

const SetupTerminal: React.VoidFunctionComponent = () => {
  useTerminalSetup()
  return null
}

export default React.memo(SetupTerminal)
