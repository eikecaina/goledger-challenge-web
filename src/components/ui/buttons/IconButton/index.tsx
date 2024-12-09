import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPlaying?: boolean
  size?: 'sm' | 'lg'
  variant?: 'primary' | 'light' | 'dark' | 'transparent'
  icon?: React.ReactNode
}

function IconButton({
  className,
  isPlaying,
  size = 'lg',
  variant = 'primary',
  icon,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={classNames(styles.root, styles[size], styles[variant], className)}
      {...rest}
    >
      {icon}
    </button>
  )
}

export default IconButton
