import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req : NextApiRequest, res:NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.API_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    if(req.query.type === "results"){
      try {
        await res.revalidate('/nandu/resultados')
        await res.revalidate('/oma/resultados')
        return res.json({ revalidated: true })
      } catch (err) {
        return res.status(500).send('Error revalidating')
      }
    }else if(req.query.type === "news"){
      try {
        await res.revalidate('/')
        return res.json({ revalidated: true })
      } catch (err) {
        return res.status(500).send('Error revalidating')
      }
    }else if(req.query.type === "calendar"){
      try {
        await res.revalidate('/calendar')
        return res.json({ revalidated: true })
      } catch (err) {
        return res.status(500).send('Error revalidating')
      }
    }
    else{
      res.status(401).json({ message: 'Incorrect option' })
    }
    
  }
  