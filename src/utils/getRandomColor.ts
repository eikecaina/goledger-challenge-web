import { getRandomIntInclusive } from './getRamdomInt'

export const getRandomColor = () => {
  const r = getRandomIntInclusive(0, 255)
  const g = getRandomIntInclusive(0, 255)
  const b = getRandomIntInclusive(0, 255)
  return `rgb(${r},${g},${b})`
}
