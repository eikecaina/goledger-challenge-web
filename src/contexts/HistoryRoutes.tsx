import { useRouter } from 'next/router'
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { removeQueryParamsFromUrl } from '../utils/removeQueryParamsFromUrl'

interface HistoryRoutesContextData {
  canGoback: boolean
  canGofront: boolean
  goBack: () => void
  goFront: () => void
}

type HistoryRoutesContextProviderProps = {
  children: ReactNode
}

export const HistoryRoutesContext = createContext({} as HistoryRoutesContextData)

export function HistoryRoutesProvider({ children }: HistoryRoutesContextProviderProps) {
  const router = useRouter()
  const [historyRoutes, setHistoryRoutes] = useState<string[]>([])
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0)

  const canGoback = useMemo(() => currentRouteIndex - 1 >= 0, [currentRouteIndex])
  const canGofront = useMemo(
    () => currentRouteIndex + 1 < historyRoutes.length,
    [currentRouteIndex, historyRoutes]
  )

  useEffect(() => {
    if (!router.isReady) {
      return
    } else if (historyRoutes.length === 0) {
      setHistoryRoutes([router.asPath])
    } else {
      const index = historyRoutes.findIndex(
        (r) => removeQueryParamsFromUrl(r) === removeQueryParamsFromUrl(router.asPath)
      )
      if (index >= 0) {
        setCurrentRouteIndex(index)
      }
    }
  }, [router, historyRoutes])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setHistoryRoutes(([...currentHistoryRoutes]) => {
        const foundIndex = currentHistoryRoutes.findIndex(
          (r) => removeQueryParamsFromUrl(r) === removeQueryParamsFromUrl(url)
        )
        if (url.includes('?isBack=1')) {
          return currentHistoryRoutes
        }
        if (foundIndex >= 0) {
          currentHistoryRoutes.splice(foundIndex, 1)
          currentHistoryRoutes.push(url)
          return currentHistoryRoutes
        }
        return [...currentHistoryRoutes, url]
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const goBack = useCallback(() => {
    canGoback &&
      router.push({
        pathname: historyRoutes[currentRouteIndex - 1],
        query: { isBack: 1 },
      })
  }, [router, canGoback, historyRoutes, currentRouteIndex])

  const goFront = useCallback(() => {
    canGofront &&
      router.push({
        pathname: historyRoutes[currentRouteIndex + 1],
        query: { isBack: 1 },
      })
  }, [router, canGofront, historyRoutes, currentRouteIndex])

  return (
    <HistoryRoutesContext.Provider value={{ canGoback, canGofront, goBack, goFront }}>
      {children}
    </HistoryRoutesContext.Provider>
  )
}
