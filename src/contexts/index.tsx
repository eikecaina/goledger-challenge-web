import { PlayerProvider } from './PlayerContext'
import { ReactNode } from 'react'
import { BackGroundProvider } from './BackGroundContext'
import { HistoryRoutesProvider } from './HistoryRoutes'

interface ProvidersPropos {
  children?: ReactNode
}
export default function Providers({ children }: ProvidersPropos) {
  return (
    <HistoryRoutesProvider>
      <PlayerProvider>
        <BackGroundProvider>{children}</BackGroundProvider>
      </PlayerProvider>
    </HistoryRoutesProvider>
  )
}
