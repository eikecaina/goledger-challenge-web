import { createContext, useState, ReactNode, useCallback, CSSProperties } from 'react'

type OptionalCSSProperties = CSSProperties | undefined

interface BackGroundContextData {
  headerStyle: OptionalCSSProperties
  backGroundStyle: OptionalCSSProperties
  handleSetHeaderStyle: (headerStyle: OptionalCSSProperties) => void
  handleSetBackGroundStyle: (backGroundStyle: OptionalCSSProperties) => void
}

type BackGroundContextProviderProps = {
  children: ReactNode
}

export const BackGroundContext = createContext({} as BackGroundContextData)

export function BackGroundProvider({ children }: BackGroundContextProviderProps) {
  const [headerStyle, setHeaderStyle] = useState<OptionalCSSProperties | undefined>(
    undefined
  )
  const [backGroundStyle, setBackGroundStyle] = useState<
    OptionalCSSProperties | undefined
  >(undefined)

  const handleSetHeaderStyle = useCallback((headerStyleArg: OptionalCSSProperties) => {
    setHeaderStyle(headerStyleArg)
  }, [])

  const handleSetBackGroundStyle = useCallback(
    (backGroundStyleArg: OptionalCSSProperties) => {
      setBackGroundStyle(backGroundStyleArg)
    },
    []
  )

  return (
    <BackGroundContext.Provider
      value={{
        headerStyle,
        backGroundStyle,
        handleSetHeaderStyle,
        handleSetBackGroundStyle,
      }}
    >
      {children}
    </BackGroundContext.Provider>
  )
}
