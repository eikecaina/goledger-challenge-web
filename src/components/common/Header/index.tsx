import { HTMLAttributes, useContext, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.css'
import IconButton from '../../ui/buttons/IconButton'
import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import ArrowRightIcon from '../../icons/ArrowRight'
import { HistoryRoutesContext } from '../../../contexts/HistoryRoutes'
import { fetchAlbum } from '../../../pages/api/endpoints'

interface HeaderProps extends HTMLAttributes<HTMLElement> { }

function Header({ className, ...rest }: HeaderProps) {
  const { canGoback, canGofront, goBack, goFront } = useContext(HistoryRoutesContext)


  const handleSearch = () => {
    fetchAlbum();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header
      className={classNames(
        styles.root,
        className,
        "flex items-center justify-start px-4 py-1 w-full"
      )}
      {...rest}
    >
    </header>
  )
}

export default Header
