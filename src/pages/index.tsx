import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { genres } from '../utils/genres'
import { AlbumCard, GenresCardCard } from '../components/ui/cards/GenresCard'
import { fetchAlbum } from './api/endpoints'

const Home: NextPage = () => {

  const [albumNames, setAlbumNames] = useState<string[]>([]);
  const [artistKeys, setArtistKeys] = useState<string[]>([]);
  const [albumKeys, setAlbumKeys] = useState<string[]>([]);


  useEffect(() => {
    const fetchAlbums = async () => {
      const { names, artistKeys, albumKeys } = await fetchAlbum();
      setAlbumNames(names);
      setArtistKeys(artistKeys);
      setAlbumKeys(albumKeys)
    };

    console.log(albumKeys);
    fetchAlbums();
  }, []);

  return (
    <div className="flex flex-col h-full w-full mt-4 py-4">
      <h2 className="text-2xl text-white font-bold">Player</h2>
      <div className="grid grid-cols-12 gap-6 h-full w-full mt-4">
        {genres.map((genre) => (
          <React.Fragment key={genre.id}>
            <GenresCardCard genre={genre} />
          </React.Fragment>
        ))}
      </div>
      <h2 className="text-2xl text-white font-bold">Navegar pelos álbuns</h2>
      <div className="grid grid-cols-12 gap-6 h-full w-full mt-4">
        <React.Fragment>
          {albumNames.map((name, index) => (
            <AlbumCard key={index} name={name} artistKey={artistKeys[index]} albumKey={albumKeys[index]} />
          ))}
        </React.Fragment>
      </div>
    </div>
  )
}

export default Home
