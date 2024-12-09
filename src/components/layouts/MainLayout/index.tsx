import classNames from 'classnames'
import { HTMLAttributes, useContext } from 'react'
import { BackGroundContext } from '../../../contexts/BackGroundContext'
import { PlayerContext } from '../../../contexts/PlayerContext'
import Header from '../../common/Header'
import Player from '../../common/Player'
import Sidebar from '../../common/Sidebar'
import styles from './styles.module.css'

interface MainLayoutProps extends HTMLAttributes<HTMLDivElement> {}

function MainLayout({ className, children, ...rest }: MainLayoutProps) {
  const { trackListIsEmpty } = useContext(PlayerContext)
  const { backGroundStyle, headerStyle } = useContext(BackGroundContext)

  return (
    <>
      <div
        className={classNames(
          styles.root,
          trackListIsEmpty && styles['tracklist-is-empty'],
          className
        )}
        {...rest}
      >
        <Sidebar />
        <div>
          <div
            className="absolute top-0 h-[570px] w-full z-10"
            style={backGroundStyle}
          ></div>
          <Header style={headerStyle} />
          <main>{children}</main>
        </div>
      </div>
      {!trackListIsEmpty && <Player />}
    </>
  )
}

export default MainLayout
