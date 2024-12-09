import classNames from 'classnames'
import PlayIcon from '../../../icons/PlayIcon'
import StopIcon from '../../../icons/StopIcon'
import IconButton, { IconButtonProps } from '../IconButton'
import styles from './styles.module.css'

interface PlayButtonProps extends IconButtonProps {
  isPlaying?: boolean
}

function PlayButton({ isPlaying, className, ...rest }: PlayButtonProps) {
  return (
    <IconButton
      className={classNames(styles.root, className)}
      {...rest}
      icon={isPlaying ? <StopIcon /> : <PlayIcon />}
    />
  )
}

export default PlayButton
