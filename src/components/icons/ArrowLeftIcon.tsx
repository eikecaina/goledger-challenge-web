import { IconProps } from '.'
import assets from '../../../assets.json'

function ArrowLeftIcon({ color = assets.colors.lightGray, size = 24 }: IconProps) {
  return (
    <svg role="img" height={size} width={size} viewBox="0 0 24 24" fill={color}>
      <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
    </svg>
  )
}

export default ArrowLeftIcon
