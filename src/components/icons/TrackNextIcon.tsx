import { IconProps } from '.'
import assets from '../../../assets.json'

function TrackNextIcon({ color = assets.colors.lightGray, size = 16 }: IconProps) {
  return (
    <svg
      role="img"
      height={size}
      width={size}
      viewBox="0 0 16 16"
      fill={color}
      //   class="Svg-sc-1bi12j5-0 hDgDGI"
    >
      <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>{' '}
    </svg>
  )
}

export default TrackNextIcon