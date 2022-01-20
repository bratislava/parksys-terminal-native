import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

interface Props {
  children: React.ReactNode
}

interface ContextProps {
  isConfirmationModalShown: boolean
  hideConfirmationModal: () => void
  setIsConfirmationModalShown: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext({} as ContextProps)

export default function GlobalProvider({ children }: Props) {
  const [isConfirmationModalShown, setIsConfirmationModalShown] =
    useState(false)

  const hideConfirmationModal = () => setIsConfirmationModalShown(false)
  console.log(
    'GlobalProvider isConfirmationModalShown:',
    isConfirmationModalShown
  )

  return (
    <GlobalContext.Provider
      value={{
        isConfirmationModalShown,
        hideConfirmationModal,
        setIsConfirmationModalShown,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
