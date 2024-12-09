import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { AlbumsCard } from '../../../components/ui/cards/AlbumCard'
import { api } from '../../../services/nextApi'
import { GenreSlugEnum, IAlbum } from '../../../types/Album'

function Genre() {
  const router = useRouter()

  const [albums, setAlbums] = useState<IAlbum[]>([])

  const getAlbumsByGenre = useCallback(async (slug: string) => {
    try {
      const response = await api.get<IAlbum[]>('/genre', {
        params: { slug },
      })
      setAlbums(response.data)
    } catch (error) {
      console.error('error: ', error)
    }
  }, [])

  useEffect(() => {
    if (!router.query?.slug) return
    const slugKey = Object.keys(GenreSlugEnum).find(
      (key) => GenreSlugEnum[key as keyof typeof GenreSlugEnum] === router.query?.slug
    )
    getAlbumsByGenre(String(slugKey))
  }, [router, getAlbumsByGenre])

  if (albums.length === 0) {
    return <></>
  }

  return (
    <div className="flex flex-col h-full w-full mt-4 py-4">
      <h2 className="text-2xl text-white font-bold">Álbuns</h2>
      <div className="grid grid-cols-12 gap-6 h-full w-full mt-4">
        {albums.map((album) => (
          <React.Fragment key={album.collectionId}>
            <AlbumsCard album={album} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Genre
