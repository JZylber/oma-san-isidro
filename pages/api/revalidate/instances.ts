import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
    try {
        await res.revalidate('/oma/instancias')
        await res.revalidate('/nandu/instancias')
        return res.json({ revalidated: true })
      } catch (err) {
        return res.status(500).send('Error revalidating')
      }
};