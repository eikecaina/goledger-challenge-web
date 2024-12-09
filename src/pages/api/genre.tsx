// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import albums from '../../../database/albums.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { slug } = req.query
  switch (method) {
    case 'GET':
      try {
        const albumsResult = albums.results.filter(
          (albumTmp) => albumTmp.primaryGenreName === slug
        )
        if (albumsResult) {
          res.status(200).json(albumsResult)
        } else {
          res.status(200).json([])
        }
      } catch (err: any) {
        res.status(500).json({ msg: 'error' })
      }
      break
  }
}
