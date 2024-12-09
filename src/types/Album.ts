export enum GenreNameEnum {
  Sertanejo = 'Preview',
}

export enum GenreSlugEnum {
  Sertanejo = 'sertanejo',
}

export interface IAlbum {
  artistId?: number
  amgArtistId?: string
  artistName?: string
  collectionName?: string
  collectionId?: string
  artistViewUrl?: string
  collectionViewUrl?: string
  artworkUrl60?: string
  artworkUrl100?: string
  trackCount?: number
  copyright?: string
  country?: string
  currency?: string
  releaseDate?: string
  primaryGenreName?: GenreNameEnum
}
