import { HTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import SpotfyLogo from '../../icons/SpotfyLogo'
import Link from 'next/link'
import { HomeIncon, PlaylistIcon, PlusIcon } from '../../icons/IconsSideBar'
import { useRouter } from 'next/router'
import { HomeOutlineIncon, PlaylistOutlineIcon, PlusOutlineIcon, } from '../../icons/HomeOutlineIcon'

interface SidebarProps extends HTMLAttributes<HTMLElement> { }

function Sidebar({ children, className, ...rest }: SidebarProps) {
  const router = useRouter()
  const artist = "artist";
  const playlist = "playlists";

  return (
    <nav className={classNames(styles.root, className)} {...rest}>
      <Link href="/" legacyBehavior>
        <a className={styles.logo_wrapper}>
          <SpotfyLogo />
        </a>
      </Link>
      <ul className={styles.list}>
        <li
          className={classNames({
            [styles.active]: router.pathname === '/',
          })}
        >
          <Link href="/" legacyBehavior>
            <a>
              {router.pathname === '/' ? <HomeIncon /> : <HomeOutlineIncon />}
              <span>Início</span>
            </a>
          </Link>
        </li>
      </ul>
      <ul className={styles.list}>
        <li
          className={classNames({
            [styles.active]: router.pathname === '/',
          })}
        >
          <Link href={`/create/${artist}`} legacyBehavior>
            <a>
              {router.pathname === '/create' ? <PlusIcon /> : <PlusOutlineIcon />}
              <span>Adicionar</span>
            </a>
          </Link>
        </li>
      </ul>
      <ul className={styles.list}>
        <li
          className={classNames({
            [styles.active]: router.pathname === '/',
          })}
        >
          <Link href={`/playlist/${playlist}`} legacyBehavior>
            <a>
              {router.pathname === '/create' ? <PlaylistIcon /> : <PlaylistOutlineIcon />}
              <span>Playlists</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
