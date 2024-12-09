import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchArtist } from '../../api/endpoints'
import { ArtistCard } from '../../../components/ui/cards/AlbumCard';

function Artist() {
    const router = useRouter()

    const { artistKey, albumKey } = router.query;
    const [artist, setArtist] = useState<string>('');


    useEffect(() => {
        if (!artistKey) return;

        const fetchData = async () => {
            try {
                const artistResults = await fetchArtist([artistKey as string]);

                if (artistResults && artistResults.length > 0) {
                    setArtist(artistResults[0].name);
                }
            } catch (error) {
                console.error('Error fetching artist:', error);
            }
        };

        fetchData();
    }, [artistKey, albumKey]);


    return (
        <div className="flex flex-col h-full w-full mt-4 py-4">
            <div className="flex flex-col h-full w-full mt-4 py-4">
                <h2 className="text-2xl text-white font-bold">{artist}</h2>
            </div>
            <div className='flex flex-col h-full w-full mt-4 py-4'>
                <ArtistCard></ArtistCard>
            </div>
        </div>

    )
}

export default Artist
