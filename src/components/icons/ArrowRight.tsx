import { IconProps } from '.'
import assets from '../../../assets.json'

function ArrowRightIcon({ color = assets.colors.lightGray, size = 24 }: IconProps) {
  return (
    <svg role="img" height={size} width={size} viewBox="0 0 24 24" fill={color}>
      <path d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>{' '}
    </svg>
  )
}

export default ArrowRightIcon
