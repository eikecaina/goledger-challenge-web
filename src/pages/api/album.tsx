// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import albums from '../../../database/albums.json'
import tracks from '../../../database/traks.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { id } = req.query
  console.log('id: ', id)
  switch (method) {
    case 'GET':
      try {
        const albumsResult = albums.results.find(
          (albumTmp) => String(albumTmp.collectionId) === String(id)
        )
        if (albumsResult) {
          const tracksResult = tracks.results.filter(
            (track) =>
              track.artistId === albumsResult.artistId ||
              track.collectionId === albumsResult.collectionId ||
              track.artistName === albumsResult.artistName ||
              track.collectionName === albumsResult.collectionName ||
              track.collectionCensoredName === albumsResult.collectionCensoredName
          )
          res.status(200).json({ albumsResult, tracksResult })
        } else {
          res.status(200).json(undefined)
        }
      } catch (err: any) {
        res.status(500).json({ msg: 'error' })
      }
      break
  }
}
