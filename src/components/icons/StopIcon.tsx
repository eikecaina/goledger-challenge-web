import { IconProps } from '.'
function StopIcon({ color = '#000', size = 28 }: IconProps) {
  return (
    <svg role="img" height={size} width={size} viewBox="0 0 24 24" fill={color}>
      <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>{' '}
    </svg>
  )
}

export default StopIcon
