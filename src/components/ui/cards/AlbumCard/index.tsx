import classNames from 'classnames'
// import Image from 'next/image'
import Link from 'next/link'
import Image from 'next/image'
// import Link from 'next/link'
import { IAlbum } from '../../../../types/Album'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { fetchSongs } from '../../../../pages/api/endpoints';
import { useRouter } from 'next/router'
import { TrackSongs } from '../../datadisplay/TracksTable'

interface AlbumsCardProps {
  album: IAlbum
}

export function AlbumsCard({ album }: AlbumsCardProps) {
  return (
    <Link href={`/album/${album.collectionId}`} legacyBehavior>
      <a key={album.collectionId} className={classNames(styles.root)}>
        <div className="relative">
          <Image
            className="aspect-square w-full object-cover rounded-full"
            src={album?.artworkUrl100 || ''}
            alt={''}
            loading="lazy"
            layout="fill"
          />
        </div>
        <h4 title={album.collectionName}>{album.collectionName}</h4>
        <p title={album.artistName}>{album.artistName}</p>
      </a>
    </Link>
  )
}

export function ArtistCard() {
  const router = useRouter();
  const { albumKey } = router.query;

  const [songs, setSongs] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!albumKey) return;

      try {
        const normalizedAlbumKey = Array.isArray(albumKey) ? albumKey : [albumKey];

        const response = await fetchSongs(normalizedAlbumKey);
        const songNames = response.map((song: any) => song.name);
        setSongs(songNames);

      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, [albumKey]);

  return (
    <TrackSongs names={songs}></TrackSongs>
  )
}
