import { GenreNameEnum } from '../types/Album'

export interface IGenre {
  id: GenreNameEnum
  backgroudColor: string
  title: string
  imgUrl: string
}

export const genres: IGenre[] = [
  {
    id: GenreNameEnum.Sertanejo,
    backgroudColor: '#c39687',
    title: GenreNameEnum.Sertanejo,
    imgUrl: 'simbol1.png',
  },
]
